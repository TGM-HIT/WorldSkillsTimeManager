// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App ref={(appcomponent) => {window.appcomponent = appcomponent}} />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MinApp from './MinApp';
import MonthView from './MonthView';
import WeekView from './WeekView';
import ListView from './ListView';
import Timetable from './Timetable';
import ResourceView from './ResourceView';
import Views from './Views';
import Items from './Items';
import Resources from './Resources';
import DualView from './DualView';
import Holidays from './Holidays';
import Booking from './Booking';
import GardenCalendar from './GardenCalendar';
import Interactions from './Interactions';

class Sample extends React.Component {
    constructor(props) {
        super(props);

        this.samples = {
            "MinApp": MinApp,
            "MonthView" : MonthView,
            "WeekView": WeekView,
            "ListView" : ListView,
            "Timetable" : Timetable,
            "ResourceView": ResourceView,
            "Views": Views,
            "Items": Items,
            "Resources": Resources,
            "DualView": DualView,
            "Holidays": Holidays,
            "Booking": Booking,
            "GardenCalendar": GardenCalendar,
            "Interactions": Interactions
        };

        this.state = { id: "MinApp" };
    }

    navigate(sampleId) {
        this.setState({ id: sampleId });
    }

    render() {
        const TagName = this.samples[this.state.id];

        return (
            <div>
                <div>
                    <ul className="menu">
                        {Object.keys(this.samples).map((key) => {
                            return (<li className="menu-item" key={key} value={key} onClick={this.navigate.bind(this, key)} >{key}</li>)
                        })
                        }
                    </ul>
                </div>
                <div>
                    <TagName />
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Sample id="MinApp" />, document.getElementById('root')
)

