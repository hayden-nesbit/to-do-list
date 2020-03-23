import React from 'react';
import Views from './buttons'
//import Card from './card'

class ScratchPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '', status: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <h1 className="text-left">To-do</h1>
                <TodoList items={this.state.items} />
                <form className="mb-5" onSubmit={this.handleSubmit}>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                        placeholder="I need to..."
                    />
                    <button className="rounded">
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
                <Views />
            </div>
        );
    }

    componentDidMount() {
        // // this.setState({
        //     items: JSON.parse(window.localStorage.items)
        // // })
        //check to see if item exists in LS
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
            id: Date.now(),
            status: 'to-do',
        };

        const newArr = this.state.items.concat(newItem)
        this.setState({
            items: newArr,
            text: '',
        });

        window.localStorage.setItem('items', JSON.stringify(newArr))
    }

}

// clearList() {
//     ///When this is clicked, clear localStorage
// }

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.checkDone = this.checkDone.bind(this);
        this.state = { checked: false }
    }

    async checkDone(e) {
        await this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return (
            <li>
            <input type="checkbox" onClick={this.checkDone}></input>
                {this.props.text}
            </li>
    )
    }
}


class TodoList extends React.Component {

    render() {
        return (
            <form>
                <ul className="text-left list-unstyled px-3">
                    {this.props.items.map(item => (
                        <TodoItem key={item.id} id={item.id} text={item.text} />
                    ))}
                </ul>
            </form>
        );
    }

}

export default ScratchPad;

