import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div class="card w-75">
            <div class="card-body">
              <h5 class="card-title" key={this.item.id}>{this.items.text}</h5>
              <a href="#" class="btn btn-primary">Button</a>
            </div>
          </div>
        )
    }

}

export default Card;






