import React from 'react';
import Views from './buttons'
import './ToDoApp.css'


class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: '',
            view: 'inprogress',
            title: 'To-do'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changedCheck = this.changedCheck.bind(this);
        this.setView = this.setView.bind(this);
        this.clearList = this.clearList.bind(this);
        this.selectAll = this.selectAll.bind(this);
    }

    render() {
        let tmpItems = this.state.items;
        if (this.state.view === "inprogress") {
            tmpItems = this.state.items.filter(item => (item.checked === false))
        }

        if (this.state.view === "done") {
            tmpItems = this.state.items.filter(item => (item.checked === true))
        }

        return (
            <div>
                <div className="d-flex justify-content-between">
                    <button onClick={this.selectAll} className="btn btn-sm btn-outline-warning px-3 float-right">Complete all</button>
                    <button onClick={this.clearList} className="btn btn-sm btn-outline-secondary px-3 float-right">Clear</button>
                </div>
                <form className="mt-3" onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="I need to..." id="button-addon2" onChange={this.handleChange} value={this.state.text}></input>
                        <button onClick={this.handleSubmit} className="btn btn-outline-secondary" type="button" id="button-addon2">Add #{tmpItems.length + 1}</button>
                    </div>
                </form>
                <h1 className="text-left">{this.state.title}</h1>
                <div className="list">
                    <TodoList changedCheck={this.changedCheck} items={tmpItems} />
                </div>
                <p className="mt-3 text-center">Items remaining: {tmpItems.length}</p>
                <Views updateView={this.setView} />
            </div>
        );
    }

    async setView(e) {
        e.preventDefault();

        let tempView = 'inprogress'
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
            tempTitle = "All"
        }

        await this.setState({
            view: tempView,
            title: tempTitle,
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
                view: 'inprogress'
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
            done: [],
            inprogress: [],
        })
    }

    selectAll(e) {
        e.preventDefault();
        const selectAll = this.state.items.map((item) => {
            item.checked = true
        })
        this.setState({
            item: selectAll
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

    componentDidMount() {
        this.setState({
            checked: this.props.checked
        })
    }

    render() {
        return (
            <div className="appField">
                <li>
                    <input type="checkbox" checked={this.state.checked} onChange={this.checkDone}></input>
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
                            text={item.text}
                            checked={item.checked} />
                    ))}
                </ul>
            </form>
        );
    }

}

export default ToDoApp;