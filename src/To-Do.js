import React from 'react';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    render() {
        return (
            <div>
                <h2 className="text-left">TODAY</h2>
                <TodoList type="checkbox" items={this.state.items} />
                <form className="mb-5" onSubmit={this.handleSubmit}>
                    {/* <label htmlFor="new-todo" className="h4">
              I need to:
            </label> */}
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button >
                        To-do #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    componentDidMount() {
        //console.log(storage, this.state)
        this.setState({
            items: JSON.parse(window.localStorage.items)
        })
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {

        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };

        const newArr = this.state.items.concat(newItem)
        console.log(newArr)
        this.setState({
            items: newArr,
            text: ''
        });

        window.localStorage.setItem('items', JSON.stringify(newArr))

    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul className="text-left">
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}

export default TodoApp;