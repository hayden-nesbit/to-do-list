import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="card w-75">
                <div class="card-body">
                    {this.props.items.map(item => (
                        <h5 class="card-title" key={item.id}>{item.text}</h5>
                        <a href="#" class="btn btn-primary"></a>
                    </div>
            </div>
        )
    }

}

export default Card;






