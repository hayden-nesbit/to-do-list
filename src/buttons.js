import React from 'react';

class Views extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-2">
                        <div className="row">
                        <div className="col-sm-4">
                            <button onClick={this.props.updateView} className="btn btn-sm btn-outline-secondary px-4">
                                    All
                            </button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-sm btn-outline-secondary px-3">
                                    To-do
                            </button>
                        </div>
                        <div className="col-sm-4">
                            <button className="btn btn-sm btn-outline-secondary px-3">
                                    Done
                            </button>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                            <button onClick={this.clearList} className="btn btn-sm btn-outline-secondary px-3">
                                    Clear
                            </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Views;