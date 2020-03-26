import React from 'react';

class Views extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <button onClick={this.props.updateView} id="all" className="btn btn-sm btn-outline-warning px-4">
                            All
                            </button>
                    </div>
                    <div className="col-md-4">
                        <button onClick={this.props.updateView} id="inprogress" className="btn btn-sm btn-outline-warning px-3">
                            To-do
                            </button>
                    </div>
                    <div className="col-md-4">
                        <button onClick={this.props.updateView} id="done" className="btn btn-sm btn-outline-warning px-3">
                            Done
                            </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Views;