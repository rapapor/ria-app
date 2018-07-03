import React, { Component } from 'react';


class Note extends Component {
    

    render() {
        const { search } = this.props;
        const { imie, wiek } = this.props.text;
    return (
        
      <div className={"note " + (imie.search(search) >= 0 && search !== "" ? "orange" : "")}>
        Mam na imię {imie} i mam {wiek} lat<i onClick={this.props.editMethod} className="fas fa-pencil-alt edit-tag"></i><span className="close-tag" onClick={this.props.deleteMethod}>&#10006;</span>
      </div>

    );
    }
    
}

export default Note;
