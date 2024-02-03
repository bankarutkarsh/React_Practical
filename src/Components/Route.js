import React, { Component } from 'react';
import { eachDayOfInterval, endOfWeek, format, startOfWeek, sub, add, isPast } from 'date-fns';
// import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
// import Modal from 'react-modal';
import '../Styles/route.css'

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
    },
};

class Route extends Component {
  constructor() {
    super();
    this.state = {
      currentDate: new Date(),
      daysInWeek: [],
      date: new Date(),
      hoursArray:[],
      eventModal:false,
      selectedCheckboxData: [],
      selectedTimezone: 'UTC+0'
    };
  }

  handleModal = (state, value) => {
    this.setState({ [state]: value })
  }

  handleTimezoneChange = (timezone) => {
    this.setState({ selectedTimezone: timezone });
  };
  

  handleCheckboxClick = (data) => {
    const array = this.state.selectedCheckboxData;
    const array1 = [...array,data]
    this.setState({ selectedCheckboxData: array1 });
  };

  nextWeek = () => {
    const d = this.state.date;
    const dat = add(d, { weeks: 1 });
    this.setState({ date: dat });
  };

  prevWeek = () => {
    const d = this.state.date;
    const dat = sub(d, { weeks: 1 });
    this.setState({ date: dat });
  };

  newWeek = (i) => {
    let weekStart = startOfWeek(i);
    let weekEnd = endOfWeek(i);
    const week = eachDayOfInterval({
      start: weekStart,
      end: weekEnd
    });
    week.pop();
    week.shift();
    return week
  };
  componentDidMount() {
    const daysInWeek = this.newWeek(this.state.date);
    this.setState({ daysInWeek });
    const arr = ['8 AM', '9 AM', '10 AM', '11 AM','12 PM', '1 PM', '2 PM', '3 PM','4 PM', '5 PM', '6 PM', '7 PM','8 PM', '9 PM', '10 PM', '11 PM']
    this.setState({hoursArray : arr})

  }

  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      const daysInWeek = this.newWeek(this.state.date);
      this.setState({ daysInWeek });
    }
  }
 

  render() {
    const { currentDate, daysInWeek, hoursArray, selectedTimezone, selectedCheckboxData, eventModal} = this.state;

    return (
      <div className="Page">
        <nav>
          <h3 onClick={this.prevWeek}>{`<<`} Previous Week</h3>
          <h1>{format(currentDate, 'MMM d yyyy')}</h1>
          <h3 onClick={this.nextWeek}>Next Week {`>>`}</h3>
        </nav>
        <div>
            <label>
              Select Timezone:
              <select value={selectedTimezone} onChange={(e) => this.handleTimezoneChange(e.target.value)}>
                <option value="UTC+0">UTC+0</option>
                <option value="UTC+5.30">UTC+5.30</option>
              </select>
            </label>
          </div>

        {daysInWeek.map((i, inx) => (
          <div className = "row" key={inx}>
            <div className='left'><h4>{format(i, 'E M/d')}</h4></div>
            {
                (isPast(i)) ? (<h2>Past</h2>) : 
                (
                    <div className='right'>{hoursArray.map((j,index) => ( 
                        <div key={index}>
                            <input 
                                id= 'check'
                                type = "checkbox"
                                onChange={() => this.handleCheckboxClick({
                                    Id: Math.floor(Math.random() *1000) +1,
                                    Name: `test${Math.floor(Math.random() *100) +1}`,
                                    date: format(i, 'yyyy-MM-dd'), 
                                    time: j })}
                            />
                            <h5>{j}</h5>
                        </div>
                        ))}
                    </div>
                )
            }
          </div>
        ))}
        {selectedCheckboxData && (
          <div className="selected-data">
            <h2>Selected Checkbox Data(Scroll Down after clicking)</h2><br/>
            {selectedCheckboxData.map((k)=>(
                <h3 className='list'>{JSON.stringify(k)}</h3>
            ))}
          </div>
        )}
        {/* <Modal
            isOpen={eventModal}
            style={customStyles}
        >   
            <div onClick={() => this.handleModal('eventModal', false)} className='bi bi-x-lg me-3 Nmodal_cross'></div>
            <h2 className='fw-bolder ms-3 mt-3 mb-5 head'> Event </h2>

            <div class="form-group mt-4">
                <label className='mb-2' for="text">Id</label>
                <input type="email" class="form-control" id="Id" placeholder="Enter a Id - ex:-101" style={{borderRadius: '0px'}} />
            </div>
            
            <div class="form-group mt-4">
                <label className='mb-2' for="text">Title</label>
                <input type="email" class="form-control" id="Title" placeholder="Enter Title" style={{borderRadius: '0px'}} />
            </div>

            <div class="form-group mt-4">
                <label className='mb-2' for="date">{this.state.date}</label>
                <input type="email" class="form-control" id="Date" value={this.state.date} style={{borderRadius: '0px'}} />
            </div>

            <div className='next_box' style={{ backgroundColor: "#F5F8FF"}}>
                <button type='submit' value='submit' className="btn btn-danger" style={{ float: 'right', marginTop: '20px' }} > Login </button>
            </div>
              
        </Modal> */}
      </div>
    );
  }
}

export default Route;