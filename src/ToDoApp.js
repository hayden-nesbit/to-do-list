import React from 'react';
import Views from './buttons'
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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changedCheck = this.changedCheck.bind(this);
    }

    render() {
        // conditional rendering
        let tmpItems = this.state.items;
        if(this.state.view === "inprogress"){
            tmpItems = this.state.inprogress;
        }

        if(this.state.view === "done"){
            tmpItems = this.state.done;
        }
        return (
            <div>
                <h1 className="text-left">To-do</h1>
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
                <Views />

            </div>
        );
    }

    changedCheck(id, checked) {
        const newItemsArr = this.state.items.map((item, index) => {
            if (item.id === id) {
                item.checked = checked
            }
            return item
            //Here I have an array that changes the checked value of the clicked item to "checked"
            //now I need to set the value of my "items" array to a filtered newItemsArr to only show non-checked items
                //***essentially deleting the item from the view */
        })

        this.setState({
            // I need to filter newItemsArr to filter out any items that have been clicked (i.e. item.checked is true)
            items: newItemsArr,
            done: newItemsArr.filter(item => (item.checked === true)),
            inprogress: newItemsArr.filter(item => (item.checked === false))
        })
    }

    componentDidUpdate() {
        window.localStorage.setItem('items', JSON.stringify(this.state.items))
        // window.localStorage.setItem('done', JSON.stringify(this.state.done))
        // window.localStorage.setItem('all', JSON.stringify(this.state.all))
    }


    //this still has problems
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

        // window.localStorage.setItem('items', JSON.stringify(newArr))
        // window.localStorage.setItem('done', JSON.stringify([]))
        // window.localStorage.setItem('all', JSON.stringify([]))



        //Need to add new empty array (2??) to local storage
            // 1. items array
            // 2. done array
            // 3. all array
        //split items array on map when checked value is changed to "true"
            //update LS
        //delete that item out of "to-do" array
        //add/push deleted item to "done" array
            //update state and LS
        //have "all" array store all entries
    }

    clearList(e) {
        e.preventDefault();
        window.localStorage.clear();
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
        this.props.changedCheck(id, checked)
    }

    render() {
        // conditional rendering
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

