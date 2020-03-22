import React from 'react';

function Views(props) {
    return  (
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <button className="btn btn-sm btn-outline-secondary px-4">
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
        </div>
    )
}

export default Views;