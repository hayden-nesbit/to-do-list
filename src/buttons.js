import React from 'react';

class Views extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex justify-content-between">

                <button onClick={this.props.updateView} id="all" className="btn btn-sm btn-outline-primary px-4">
                    All
                            </button>

                <button onClick={this.props.updateView} id="inprogress" className="btn btn-sm btn-outline-primary px-3">
                    To-do
                            </button>

                <button onClick={this.props.updateView} id="done" className="btn btn-sm btn-outline-primary px-3">
                    Done
                            </button>

            </div>
        )
    }
}

export default Views;