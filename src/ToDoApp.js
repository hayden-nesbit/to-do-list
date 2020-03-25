import React from 'react';
import Views from './buttons'
import './ToDoApp.css'
//import Card from './card'


class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            done: [],
            text: '',
            view: 'all',
            inprogress: [],
            title: 'To-do' 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changedCheck = this.changedCheck.bind(this);
        this.setView = this.setView.bind(this);
        this.clearList = this.clearList.bind(this);
    }

    render() {
        // conditional rendering
        let tmpItems = this.state.items;
        if (this.state.view === "inprogress") {
            tmpItems = this.state.inprogress;
        }

        if (this.state.view === "done") {
            tmpItems = this.state.done;
        }
        return (
            <div>
                <button onClick={this.clearList} className="btn btn-sm btn-outline-secondary px-3 float-right mr-3">Clear</button>
                <h1 className="text-left">{this.state.title}</h1>
                <TodoList changedCheck={this.changedCheck} items={tmpItems} />
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
                <Views updateView={this.setView}/>
            </div>
        );
    }

    setView(e) {
        e.preventDefault();
        
        let tempView = 'all'
        let tempTitle = 'To-do'

        if (e.target.id == "done") {
            tempView = "done"
            tempTitle = "Done"
        } 
        else if (e.target.id == "inprogress") {
            tempView = "inprogress"
            tempTitle = "To-do"
        }
        else if (e.target.id == "all") {
            tempView = "all"
            tempTitle = "All items"
        }

        this.setState({
            view: tempView,
            title: tempTitle
        })
    }

    changedCheck(id, checked) {
        const newItemsArr = this.state.items.map((item, index) => {
            if (item.id === id) {
                item.checked = checked
            }
            return item
        })

        this.setState({
            items: newItemsArr,
            done: newItemsArr.filter(item => (item.checked === true)),
            inprogress: newItemsArr.filter(item => (item.checked === false))
        })
    }

    componentDidUpdate() {
        window.localStorage.setItem('items', JSON.stringify(this.state.items))
    }


    componentDidMount() {
        if (window.localStorage.items) {
            let items = JSON.parse(window.localStorage.items)
            this.setState({
                items: items,
                done: items.filter(item => (item.checked === true)),
                inprogress: items.filter(item => (item.checked === false)),
                view: 'all'
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
    }

    clearList(e) {
        e.preventDefault();
        this.setState({
            items: [],
            done: []
        })
    }
}

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

        this.props.changeItem(this.props.id, this.state.checked)
    }

    render() {
        return (
            <div className="appField">
                <li>
                    <input type="checkbox" onClick={this.checkDone}></input>
                    {this.props.text}
                </li>
            </div>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    updateLocalStorage(id, checked) {
        this.props.changedCheck(id, checked)
    }

    render() {
        let tmpItems = this.props.items;
        return (
            <form>
                <ul className="text-left list-unstyled px-3">
                    {tmpItems.map(item => (
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