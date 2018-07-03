import React, { Component } from 'react';
import Note from './components/Note'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imie: '',
            wiek: '',
            currentIndex: '',
            search: '',
            notes: JSON.parse(localStorage.getItem("notes")) || [],
             
        }
    }

    updateimie(noteText) {
        this.setState({imie: noteText.target.value})
    }

    updatewiek(noteText) {
        if(noteText.target.value === "" || !isNaN(parseInt(noteText.target.value, 10))){
            let wiek = parseInt(noteText.target.value, 10);
            if(isNaN(wiek)){ wiek = "" }
            this.setState({ wiek })     
        }    

    }

    updatesearch(search){
        this.setState({search: search.target.value})        
    }



    shouldComponentUpdate(nextProps, nextState){
        localStorage.setItem('notes', JSON.stringify(nextState.notes))
        return true
    }


    addNote() {
        if (this.state.imie === '') {return}
        else if (this.state.currentIndex !== ''){

            let person = {'imie': this.state.imie, 'wiek': this.state.wiek}
            let notesArr = this.state.notes;
            notesArr[this.state.currentIndex] = person;

            this.setState({ imie: '', wiek: '',currentIndex: '', notes: notesArr });

        }else {
            let person = {'imie': this.state.imie, 'wiek': this.state.wiek}       
            this.setState({ imie: '', wiek: '', notes: [...this.state.notes, person]});
            this.textInput.focus();
        }        
        
    }

    editMethod(index) {
        let note = this.state.notes[index]
        this.setState({imie: note.imie, wiek: note.wiek, currentIndex: index}) 
        
    }

    deleteNote(index) {
        let notesArr = this.state.notes;
        notesArr.splice(index,1);
        this.setState({notes: notesArr})
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (this.state.imie === '') {return}

            let person = {'imie': this.state.imie, 'wiek': this.state.wiek}     
            this.setState({ imie: '', wiek: '', notes: [...this.state.notes, person]});
        }
    }
    

    render() {

        let notes = this.state.notes.map((val, key) => {
            return <Note search={this.state.search} key={key} text={val} editMethod={() => this.editMethod(key)} 
                deleteMethod={ () => this.deleteNote(key)} />
            })

    return (
      <div className="container">

        <div className="header">
            <div className="title-header">Aplikacje RIA</div>
            <div>
                <input placeholder="wpisz imię aby wyszukać" type="text"
                ref={((input) => {this.textInput = input })} 
                className="textInput3"
                value={this.state.search}
                onChange={search => this.updatesearch(search)}
                onKeyPress={this.handleKeyPress.bind(this)}
                />
            </div>
        </div>
        {notes}
        <div className="btn" onClick={this.addNote.bind(this)}>+</div>

        <input placeholder="wpisz imię" type="text"
            ref={((input) => {this.textInput = input })} 
            className="textInput1"
            value={this.state.imie}
            onChange={imie => this.updateimie(imie)}
            onKeyPress={this.handleKeyPress.bind(this)}
            />
        <input placeholder="wpisz wiek" type="text"
            ref={((input) => {this.textInput = input })} 
            className="textInput2"
            value={this.state.wiek}
            onChange={wiek => this.updatewiek(wiek)}
            onKeyPress={this.handleKeyPress.bind(this)}
            />            
      </div>
    );
    }
}

export default App;
