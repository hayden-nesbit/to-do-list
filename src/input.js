import React from "react";

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.inputItems = ["first", "second", "third"];
        this.inputItemsHTML = this.inputItemsHTML
    }


    render() {
        return (
        this.inputItemsHTML = this.inputItems.map((item) => {
            
            const element = (
                <h1 className="greeting">
                  Hello, world!
                </h1>
              );
        //     <div class="input-group mb-3">
        //     <div class="input-group-prepend">
        //       <div class="input-group-text">
        //         <input type="checkbox" aria-label="Checkbox for following text input"></input>
        //       </div>
        //     </div>
        //     <input type="text" class="form-control" aria-label="Text input with checkbox"></input>
        //   </div>
            
        })
        
        )
}
}


export default Input;