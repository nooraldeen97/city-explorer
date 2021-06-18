import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Card,CardColumns,Table} from 'react-bootstrap/';
import axios from 'axios';
import Movie from './components/Movie';
import Weather from './components/Weather';

class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      dataRenderedInCard:'',
      errorMsg:'',
      renderedLocWeatherData:[],
      displayMap:false,
      displarErrorMsg: false,
      showWeather : false,
      weatherErr:'',
      dspErrWeather:false,
      movieInfo:'',
      showMovie:false,
      movieError:''
    }
  }

  showData= async (event)=>{
    event.preventDefault();
    let inputCity= event.target.userInput.value;
    let locURL = `https://us1.locationiq.com/v1/search.php?key=pk.370701c55ed7503519f7418b1098f8d2&q=${inputCity}&format=json`;
    let weatherData = `${process.env.REACT_APP_URL}/weather?searchQuery=${inputCity}`;
    let movieData= `${process.env.REACT_APP_URL}/movies?city=${inputCity}`;
    try{
    let movieResult= await axios.get(movieData);
    console.log(movieResult.data);
      this.setState({
        movieInfo:movieResult.data,
        showMovie:true
      })
      console.log(this.state.movieInfo)
    }
    catch(err){
      this.setState({
        movieError:err,
        showMovie:false
      })
    }
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
      console.log(locWeatherData.data)
      
         this.setState({
           renderedLocWeatherData : locWeatherData.data,
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

                {this.state.showWeather &&
       <Table striped bordered hover>
            <thead>
                <tr>
                  <th>date</th>
                  <th>description</th>
                </tr>
            </thead>
           {this.state.renderedLocWeatherData.map((element)=>{
             return(<Weather
              description={element.description}
              date={element.date}
             />
             )
           })}
      </Table>
           }
        <CardColumns>
        {this.state.showMovie &&
         this.state.movieInfo.map(item=>(
          <Movie
          Title={item.title}
          description={item.overview}
          imgURL={item.image_ur}
          date={item.released_on}
          vote={item.average_votes}
          />
        ))}
        </CardColumns>
          {this.state.movieError && 
        <p>error in getting data</p>}

        {/* {this.state.dspErrWeather && <p>{this.state.weatherErr}</p>}  */}
      </div>
    )
  };
};

export default App;
