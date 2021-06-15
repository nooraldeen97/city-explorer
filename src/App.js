import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Card} from 'react-bootstrap/';
import axios from 'axios';


class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      dataRenderedInCard:'',
      errorMsg:'',
      renderedLocWeatherData:'',
      displayMap:false,
      displarErrorMsg: false,
      showWeather : false,
      weatherErr:'',
      dspErrWeather:false,
    }
  }


  showData= async (event)=>{
    event.preventDefault();
    let inputCity= event.target.userInput.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.370701c55ed7503519f7418b1098f8d2&q=${inputCity}&format=json`;
    let weatherData = `${process.env.REACT_APP_URL}/weather?searchQuery=${inputCity}`;

    try{
      let locResult = await axios.get(locURL);
      this.setState({
        dataRenderedInCard: locResult.data[0],
        displayMap:true,
        displarErrorMsg:false,

      })

    }
    
    catch{

    this.setState({
      errorMsg:'sorry , Error in response !!',
      displarErrorMsg : true,
      displayMap: false
    })
    }

    try{
      let locWeatherData = await axios.get(weatherData);
       this.setState({
         renderedLocWeatherData : locWeatherData.data[0],
         showWeather : true , 
         dspErrWeather:false,
       })
     
    }
    catch{
      this.setState({
        weatherErr:'sorry , no weather data availabe for your location',
        showWeather : false ,
        dspErrWeather:true
      })

    }
  };

  


  render(){
    return(
      <div>
        <Form onSubmit={this.showData}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>City Explorer</Form.Label>
            <Form.Control type="text" placeholder="Enter your city" name='userInput' />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Explore!
          </Button>
        </Form>

       {this.state.displayMap && <Card className="bg-dark text-white">
          <Card.Img className='cardImg' src={`https://maps.locationiq.com/v3/staticmap?key=pk.370701c55ed7503519f7418b1098f8d2&center=${this.state.dataRenderedInCard.lat},${this.state.dataRenderedInCard.lon}`} alt="Card image" height='600px'/>
          <Card.ImgOverlay>
            <Card.Title>name : {this.state.dataRenderedInCard.display_name}</Card.Title>
            <Card.Text>lat : {this.state.dataRenderedInCard.lat}</Card.Text>
            <Card.Text> lon : {this.state.dataRenderedInCard.lon}</Card.Text>
          </Card.ImgOverlay>
        </Card>}
          {this.state.displarErrorMsg && <p>{ this.state.errorMsg}</p>}  
    
      {this.state.showWeather && <Card>
          <Card.Body>    
                <p>{this.state.renderedLocWeatherData.date}</p>
          </Card.Body>
        </Card>}
        {this.state.dspErrWeather && <p>{this.state.weatherErr}</p>} 
      </div>
    )
  };
};

export default App;
