import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            fcc: "recent"
        };
        this.getTopRecent = this.getTopRecent.bind(this);

    }

    getTopRecent(){
        var request = new XMLHttpRequest();
        request.open("get", "https://fcctop100.herokuapp.com/api/fccusers/top/" + this.state.fcc, false);
        request.send();
        var json = JSON.parse(request.responseText);
        return json;
    };

    handleClick(event) {
        if(event.target.className === "sort sorted"){
            return false;
        }

        var nodes = document.getElementsByClassName("sort");
        for (var i = 0; i < nodes.length; i++) {
            nodes.item(i).className = "sort";
        }

        event.target.className = "sort sorted";

        this.setState({fcc: event.target.id});
        this.getTopRecent();
    }


    render() {
        return (
            <div className="panel panel-default top-margin">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Camper Leaderboard</h3>
                </div>
                <div className="panel-body">
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Camper Name</th>
                            <th id="recent" className="sort sorted" onClick={this.handleClick}>Points in past 30 days</th>
                            <th id="alltime" className="sort" onClick={this.handleClick}>All time points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.getTopRecent().map(function(person, i){
                                return (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>
                                            <a href={"https://www.freecodecamp.com/" + person.username} >
                                                {person.username}
                                            </a>
                                            <span className="pull-right"><img src={person.img} className="img-responsive img-rounded" alt={person.username}/></span>
                                        </td>
                                        <td>{person.recent}</td>
                                        <td>{person.alltime}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
