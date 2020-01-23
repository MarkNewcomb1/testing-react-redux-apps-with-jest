// ./**tests**/todo_component_test.js
describe('Editing todos', () => {
    let wrapper, props_;
    //In this before each, we are opening the form and changing the to-do title value before each of the tests is run. This helps us to avoid having to do this repeatedly for every it block.
    beforeEach(() => {
        // spy on the component handleFieldChange method
        sinon.spy(Todo.prototype, "handleFieldChange");
        // spy on the component handleEdit method
        sinon.spy(Todo.prototype, "handleEdit");
        // spy on the component handleClose method
        sinon.spy(Todo.prototype, "handleClose");
        const { enzymeWrapper, props } = shallowSetup();
        wrapper = enzymeWrapper;
        props_ = props;
        const button = wrapper.find('button').first();
        button.simulate('click');
        // find the input field containing the todo title and simulate a change to it's value
        const titleInput = wrapper.find('input').at(0);
        titleInput.simulate('change', {
            target: {
                value: 'Changed title',
                name: 'title'
            },
        });
    });
    afterEach(() => {
        Todo.prototype.handleFieldChange.restore();
        Todo.prototype.handleEdit.restore();
        Todo.prototype.handleClose.restore();
    });
    it('should change state when input values change and call handleFieldChange', () => {
        // this.state.todo should now have a title field with it's value as the new title we entered.
        expect(wrapper.state().todo.title).toEqual('Changed title');
        // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
        expect(Todo.prototype.handleFieldChange.calledOnce).toBe(true);
    });
    describe('Submit edits', () => {
        it('should call handleEdit, editTodo and handleClose when update button is clicked', () => {
            const button = wrapper.find('button.ui.basic.green.button');
            button.simulate('click');
            // Confirm that the different component methods called when we submit edits are called.
            expect(Todo.prototype.handleEdit.calledOnce).toBe(true);
            expect(Todo.prototype.handleClose.calledOnce).toBe(true);
            // the mock function we passed to the renderer instead of the action should be called and with the new values we entered.
            expect(editTodo).toBeCalledWith(props_.id, {"title": "Changed title"});
        });
    });
});
