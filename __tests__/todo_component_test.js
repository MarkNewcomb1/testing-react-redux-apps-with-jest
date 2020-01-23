// ./**tests**/todo_component_test.js
describe('Todo form', () => {
    let wrapper, props_;
    beforeEach(() => {
        // spy on the component handleOpen method
        sinon.spy(Todo.prototype, "handleOpen");
        const { enzymeWrapper, props } = shallowSetup();
        wrapper = enzymeWrapper;
        props_ = props;
    });
    afterEach(() => {
        Todo.prototype.handleOpen.restore();
    });
    it('should update the state property _**`formOpen`**_ and call handleOpen when edit button is clicked', () => {
        // find the edit button and simulate a click on it
        const button = wrapper.find('button').first();
        button.simulate('click');
        // The handleOpen method should be called.
        expect(Todo.prototype.handleOpen.calledOnce).toBe(true);
        // The value of this.state.formOpen should now be true
        expect(wrapper.state().formOpen).toEqual(true);
    });
    it('should display different buttons', () => {
        const button = wrapper.find('button').first();
        button.simulate('click');
        // When we click the edit button, the Update button should be present.
        expect(wrapper.find('button.ui').length).toBe(2);
        expect(wrapper.find('button.ui.basic.green.button').text()).toBe(' Update');
    });
    it('should display current values in edit fields', () =>{
        const button = wrapper.find('button').first();
        button.simulate('click');
        // Before any edits are made, the prepopulated values in the input fields should be the same passed through props.
        expect(wrapper.find('input').at(0).props().defaultValue).toEqual(props_.title);
    });
});
