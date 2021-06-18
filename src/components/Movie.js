import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component{
    render(){
        return(
            
     <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.imgURL} alt={this.props.Title} />
        <Card.Body>
        <Card.Title>{this.props.Title}</Card.Title>
        <Card.Text>
             {this.props.description}
        </Card.Text>
        <Card.Text>
             {this.props.date}
        </Card.Text>
        <Card.Text>
            {this.props.average_votes}
        </Card.Text>

        </Card.Body>
    </Card>
        )
    }
}

export default Movie; 