import React from 'react';
import Views from './buttons'
//import Card from './card'


class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '', status: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changedCheck = this.changedCheck.bind(this);    
    }

    render() {
        return (
            <div>
                <h1 className="text-left">To-do</h1>
                <TodoList changedCheck={this.changedCheck} items={this.state.items} />
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
                
            </div>
        );
    }

    changedCheck(id, checked) {
       console.log("hello changeCheck")
       console.log(id)
       //take id and status of checked and update LS for item checked
       //upon setState, save state to LS
        // const singleItem = this.state.items.find(item => item.id === id)
        // console.log(singleItem)
        // singleItem.checked = checked;
       
        const newItemsArr = this.state.items.map((item, index) => {
            if (item.id === id) {
                item.checked = checked
            }
            return item
        })
        console.log(newItemsArr)

       this.setState({
            items: newItemsArr
        })
    }

    componentDidUpdate() {
        window.localStorage.setItem('todo', JSON.stringify(this.state.items))
    }


    //this still has problems
    componentDidMount() {
        if (window.localStorage.todo) {
            this.setState({
                items: JSON.parse(window.localStorage.todo)
            })
        }
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
            checked: false,
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
            checked: !this.state.checked,
        })
        console.log(this.props.id)

        this.props.changeItem(this.props.id, this.state.checked)
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
    constructor(props) {
        super(props);
    }

    updateLocalStorage(id, checked) {
        console.log({id, checked})
        this.props.changedCheck(id, checked)
    }

    render() {
        return (
            <form>
                <ul className="text-left list-unstyled px-3">
                    {this.props.items.map(item => (
                        <TodoItem 
                            changeItem={this.updateLocalStorage.bind(this)} 
                            key={item.id} 
                            id={item.id} 
                            text={item.text} />
                    ))}
                </ul>
            </form>
        );
    }

}

export default ToDoApp;

