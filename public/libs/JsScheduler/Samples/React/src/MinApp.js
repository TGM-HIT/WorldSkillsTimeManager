import React, { Component } from 'react';
import { Info, Footer } from './Info';
import { Locale } from '@mindfusion/common';
import { ObservableCollection } from '@mindfusion/common-collections';
import { ReactCalendar } from './Calendar';
import * as p from '@mindfusion/scheduling';
import '@mindfusion/scheduling/themes/blue.css';
import '@mindfusion/scheduling/themes/business.css';
import '@mindfusion/scheduling/themes/earth.css';
import '@mindfusion/scheduling/themes/gray.css';
import '@mindfusion/scheduling/themes/green.css';
import '@mindfusion/scheduling/themes/light.css';
import '@mindfusion/scheduling/themes/peach.css';
import '@mindfusion/scheduling/themes/standard.css';
import '@mindfusion/scheduling/themes/pastel.css';

import { locale as enLocale } from '@mindfusion/scheduling/localization/en';
import { locale as deLocale } from '@mindfusion/scheduling/localization/de';
import { locale as ruLocale } from '@mindfusion/scheduling/localization/ru';

class MinApp extends Component {
  constructor(props) {
    super(props);

    var date = new p.DateTime();
    var items = new ObservableCollection();

    for (var i = 0; i < 5; i++) {
      var item = new p.Item();
      item.subject = "calendar item" + i.toString();
      item.startTime = date.clone().addDays(Math.floor((Math.random() * 30) + 1));
      item.endTime = item.startTime.clone().addDays(Math.floor(Math.random() * 5));
      items.add(item);
    }

    this.calProps = {
      currentView: p.CalendarView.SingleMonth,
      schedule:
      {
        items: items
      }
    }
  }

  changeView(value) {
    this.reactCalendar.setState({ currentView: value });
  }

  onThemeChanged(e) {
    this.reactCalendar.setState({ theme: e.target.value });
  }

  onLocaleChanged(e) {
    var locale = e.target.value;

    var localeObj = new Locale(locale);
    localeObj.fromJson(JSON.stringify(require(`cldr-dates-full/main/${locale}/ca-gregorian.json`)));
    localeObj.dateFormats.shortDate = localeObj.dateFormats.shortDate.replace("yy", "yyyy");
    switch (locale) {
      case "de": localeObj.strings = deLocale.strings; break;
      case "ru": localeObj.strings = ruLocale.strings; break;
      default: localeObj.strings = enLocale.strings;
    }
    this.reactCalendar.setState({ locale: localeObj });
  }

  render() {
    return (

      <div className="App">

        <div className="header">
          <button onClick={(e) => this.changeView(1, e)}>Single Month</button>
          <button onClick={(e) => this.changeView(0, e)}>MonthRange</button>
          <button onClick={(e) => this.changeView(3, e)}>List</button>
          <button onClick={(e) => this.changeView(2, e)}>Week Range</button>
          <button onClick={(e) => this.changeView(4, e)}>Timetable</button>
          <select id="theme" onChange={this.onThemeChanged.bind(this)}>
            <option value="">none</option>
            <option value="standard">standard</option>
            <option value="light">light</option>
            <option value="business">business</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="gray">gray</option>
            <option value="peach">peach</option>
            <option value="earth">earth</option>
            <option value="pastel">pastel</option>
          </select>
          <select id="locale" onChange={this.onLocaleChanged.bind(this)}>
            <option value="en">english(default)</option>
            <option value="de">german</option>
            <option value="ru">russian</option>
          </select>
        </div>

        <div className="container">
          <div className="main">
            <ReactCalendar {...this.calProps} ref={(ref) => this.reactCalendar = ref} />
          </div>
          <div className="sidebar">
            <h1>About this sample</h1>
            <p>A sample program that shows everything needed to embed MindFusion.Scheduling in	a web page.</p>
            <Info />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


export default MinApp;
