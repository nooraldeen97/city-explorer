import React from 'react';


class Weather extends React.Component{
    render(){
        return(
          
        <tbody>
           <tr>
                <td>{this.props.date}</td>
                <td>{this.props.description} </td>
          </tr>
        </tbody>
          
        )
    }
}

export default Weather;