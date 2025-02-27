MindFusion = {
	Common: {
		Collections: {
			IEnumerable: function (items) {
				/// <summary>Represents an array of arbitrary objects.</summary>
				/// <param name="items" type="Array" optional="true">Optional. Array. The underlying array data structure of the collection.</param>
			},
			List: function (items) {
				/// <summary>Represents an array of arbitrary objects.</summary>
				/// <param name="items" type="Array" optional="true">Optional. Array. The underlying array data structure of the list.</param>
			},
			ObservableCollection: function (items) {
				/// <summary>Represents a collection of arbitrary objects.</summary>
				/// <param name="items" type="Array" optional="true">Optional. Array. The underlying array data structure of the collection.</param>
				/// <field name="collectionChanged" type="EventDispatcher">Occurs when an item is added, removed, changed, moved, or the entire list is refreshed. Syntax: collectionChanged.addEventListener( function(sender, args){} );</field>
				/// <field name="collectionChanging" type="EventDispatcher">Occurs just before an item is added, removed, changed, moved, or the entire list is refreshed. Syntax: collectionChanging.addEventListener( function(sender, args){} );</field>
			},
			__namespace: true
		},
		Control: function (element) {
			/// <summary>A base class for UI controls.</summary>
			/// <param name="element" type="HTMLElement" optional="true">Optional. HTMLElement. The control's associated Dom element.</param>
			/// <field name="bounds" type="MindFusion.Common.Rect">Gets the bounds of this control.</field>
			/// <field name="cssClass" type="String">Gets or sets the css class of the control.</field>
			/// <field name="data" type="Object">Gets or sets an object, holding custom user data.</field>
			/// <field name="element" type="HTMLElement">Gets a reference to the control's element.</field>
			/// <field name="enabled" type="Boolean">Gets or sets a value indicating whether user interactions are allowed for this control.</field>
			/// <field name="height" type="MindFusion.Common.Unit">Gets or sets the height of this control.</field>
			/// <field name="left" type="MindFusion.Common.Unit">Gets or sets the X-coordinate of the location of this control.</field>
			/// <field name="licenseLocation" type="String">Gets or sets the URL of the control's license file.</field>
			/// <field name="loaded" type="Boolean">Gets a value indicating whether this control is loaded and ready for interaction.</field>
			/// <field name="rect" type="MindFusion.Common.Rect">Gets the bounding rect of this control.</field>
			/// <field name="theme" type="String">Gets or sets the current theme of the control.</field>
			/// <field name="top" type="MindFusion.Common.Unit">Gets or sets the Y-coordinate of the location of this control.</field>
			/// <field name="visible" type="Boolean">Gets or sets the visibility of this control.</field>
			/// <field name="width" type="MindFusion.Common.Unit">Gets or sets the width of this control.</field>
			/// <field name="controlLoad" type="EventDispatcher">Raised when the control is loaded. Syntax: controlLoad.addEventListener( function(sender, args){} );</field>
			/// <field name="controlUnload" type="EventDispatcher">Raised when the control is unloaded. Syntax: controlUnload.addEventListener( function(sender, args){} );</field>
			/// <field name="focus" type="EventDispatcher">Raised when the control is focused. Syntax: focus.addEventListener( function(sender, args){} );</field>
		},
		DateFormats: function () {
			/// <summary>Defines format string for dates and time.</summary>
			/// <field name="dayMonth" type="String">Gets or sets the day-month format string.</field>
			/// <field name="longDate" type="String">Gets or sets the long date format string.</field>
			/// <field name="longDateTime" type="String">Gets or sets the long date-time format string.</field>
			/// <field name="longTime" type="String">Gets or sets the long time format string.</field>
			/// <field name="shortDate" type="String">Gets or sets the short date format string.</field>
			/// <field name="shortDateTime" type="String">Gets or sets the short date-time format string.</field>
			/// <field name="shortTime" type="String">Gets or sets the short time format string.</field>
			/// <field name="yearMonth" type="String">Gets or sets the year-month format string.</field>
		},
		DateSettings: function (localeId) {
			/// <summary>Defines properties that allow customization of date-specific information.</summary>
			/// <param name="localeId" type="String">String. The string identifier of the locale.</param>
			/// <field name="dateFormats" type="MindFusion.Common.DateFormats">Gets the DateFormats object used to hold date and time format strings.</field>
			/// <field name="dateSeparator" type="String">Gets or sets the date separator character.</field>
			/// <field name="dayPeriodAM" type="String">Gets or sets the before noon time designator.</field>
			/// <field name="dayPeriodPM" type="String">Gets or sets the after noon time designator.</field>
			/// <field name="dayPeriods" type="Object">Gets an object containing the time designators.</field>
			/// <field name="days" type="Object">Gets an object containing lists of day names.</field>
			/// <field name="firstDayOfWeek" type="Number">Gets or sets a value indicating the first day of the week to use.</field>
			/// <field name="longDays" type="Array">Gets or sets a list of long day names.</field>
			/// <field name="longMonths" type="Array">Gets or sets a list of long month names.</field>
			/// <field name="months" type="Object">Gets an object containing lists of month names.</field>
			/// <field name="narrowDays" type="Array">Gets or sets a list of narrow day names.</field>
			/// <field name="narrowMonths" type="Array">Gets or sets a list of narrow month names.</field>
			/// <field name="shortDays" type="Array">Gets or sets a list of short month names.</field>
			/// <field name="shortMonths" type="Array">Gets or sets a list of short month names.</field>
			/// <field name="timeSeparator" type="String">Gets or sets the time separator character.</field>
		},
		EventDispatcher: function () {
			/// <summary>Represents a dispatcher for an event.</summary>
		},
		IdGenerator: function () {
			/// <summary>Generates unique ids.</summary>
		},
		Locale: function (id) {
			/// <summary>Provides culture-specific information.</summary>
			/// <param name="id" type="String" optional="true">Optional. String. The string identifier of the locale.</param>
			/// <field name="dateFormats" type="MindFusion.Common.DateFormats">Gets the DateFormats object used to hold date and time format strings.</field>
			/// <field name="dateSettings" type="MindFusion.Common.DateSettings">Gets the DateSettings object used to hold date-specific information.</field>
			/// <field name="id" type="String">Gets the string identifier of the locale.</field>
			/// <field name="strings" type="Object">Gets or sets the dictionary of custom strings.</field>
		},
		NotifyCollectionChangedAction: function () {
			/// <summary>Specifies the type of the collection changed action.</summary>
		},
		NotifyCollectionChangedEventArgs: function (action, changes, index) {
			/// <summary>Provides data for CollectionChanged events.</summary>
			/// <param name="action" type="NotifyCollectionChangedAction">NotifyCollectionChangedAction. The action that caused the event.</param>
			/// <param name="changes" type="Array" optional="true">Optional. Array. The items affected by the change.</param>
			/// <param name="index" type="Number" optional="true">Optional. Number. The index where the change occurred.</param>
			/// <field name="action" type="MindFusion.Common.NotifyCollectionChangedAction">Gets the action that caused the event.</field>
			/// <field name="index" type="Number">Gets the index where the change occurred.</field>
			/// <field name="newItems" type="Array">Gets the list of new items involved in the change.</field>
			/// <field name="oldItems" type="Array">Gets the list of the items affected by a Remove action.</field>
		},
		NotifyCollectionChangingEventArgs: function (action, changes, index) {
			/// <summary>Provides data for CollectionChanging events.</summary>
			/// <param name="action" type="NotifyCollectionChangedAction">NotifyCollectionChangedAction. The action that caused the event.</param>
			/// <param name="changes" type="Array" optional="true">Optional. Array. The items affected by the change.</param>
			/// <param name="index" type="Number" optional="true">Optional. Number. The index where the change occurred.</param>
			/// <field name="action" type="MindFusion.Common.NotifyCollectionChangedAction">Gets the action that caused the event.</field>
			/// <field name="newItems" type="Array">Gets the list of new items involved in the change.</field>
			/// <field name="oldItems" type="Array">Gets the list of the items affected by a Remove action.</field>
		},
		PropertyEventArgs: function (propertyName, oldValue, newValue) {
			/// <summary>Provides data for PropertyValueChanged events.</summary>
			/// <param name="propertyName" type="String">String. The name of the property that changed.</param>
			/// <param name="oldValue" type="Object">Object. The old value of the property.</param>
			/// <param name="newValue" type="Object">Object. The new value of the property.</param>
			/// <field name="newValue" type="Object">Gets the current value of the property.</field>
			/// <field name="oldValue" type="Object">Gets the value of the property before the change.</field>
			/// <field name="propertyName" type="String">Gets the name of the property that changed.</field>
		},
		UIControl: function (element) {
			/// <summary>Initializes a new instance of the Control class.</summary>
			/// <param name="element" type="HTMLElement" optional="true">Optional. HTMLElement. The control's associated Dom element.</param>
		},
		Unit: function (value, type) {
			/// <summary>Represents a length measurement.</summary>
			/// <param name="value" type="Number" optional="true">Optional. Number. The value of the unit.</param>
			/// <param name="type" type="UnitType" optional="true">Optional. UnitType. The type of the unit.</param>
			/// <field name="isEmpty" type="Boolean">Gets a value representing whether this Unit instance has a set value.</field>
			/// <field name="type" type="MindFusion.Common.UnitType">The unit type.</field>
			/// <field name="value" type="Number">The unit value.</field>
		},
		__namespace: true
	},
	Controls: {
		CancelEventArgs: function () {
			/// <summary>Provides a value to use with cancellable events.</summary>
			/// <field name="cancel" type="Boolean">Gets or sets a value indicating whether to allow the current operation.</field>
			/// <field name="handled" type="Boolean">Gets or sets a value indicating whether the event has been handled. Inherited from EventArgs.</field>
		},
		Canvas: function () {
			/// <summary>Handles drawing on a CanvasRenderingContext2D.</summary>
			/// <field name="bounds" type="MindFusion.Controls.Rect">Gets the underlying Canvas element's logical bounds.</field>
			/// <field name="measureUnit" type="MindFusion.Controls.GraphicsUnit">Gets or sets the unit of measure used for logical coordinates.</field>
			/// <field name="minVisibleFontSize" type="Number">Gets or sets a threshold value that hides text if scaled font sizes become smaller.</field>
			/// <field name="scale" type="Number">Gets the current scale of this Canvas.</field>
			/// <field name="element" type="HTMLElement">Returns a reference to the control's DOM element. Inherited from Disposable.</field>
			/// <field name="enabled" type="Boolean">Gets or sets whether mouse events are enabled. Inherited from Disposable.</field>
		},
		CanvasControl: function (element, canvas) {
			/// <summary>The CanvasControl class represents a wrapper class for the HTML5 Canvas element.</summary>
			/// <param name="element" type="HTMLCanvasElement">HTMLCanvasElement. The Canvas DOM Element this CanvasControl is associated with.</param>
			/// <param name="canvas" type="Canvas" optional="true">Optional. Canvas. The Canvas instance this CanvasControl is associated with.</param>
			/// <field name="measureUnit" type="MindFusion.Controls.GraphicsUnit">Gets the unit of measure used for logical coordinates.</field>
			/// <field name="element" type="HTMLElement">Returns a reference to the control's DOM element. Inherited from Disposable.</field>
			/// <field name="enabled" type="Boolean">Gets or sets whether mouse events are enabled. Inherited from Disposable.</field>
		},
		Control: function (element) {
			/// <summary>A base class for MindFusion controls.</summary>
			/// <param name="element" type="HTMLElement">HTMLElement. The DOM Element this Control is associated with.</param>
			/// <field name="element" type="HTMLElement">Returns a reference to the control's DOM element.</field>
			/// <field name="enabled" type="Boolean">Gets or sets whether mouse events are enabled.</field>
		},
		Disposable: function () {
			/// <summary>Disposable abstract class.</summary>
			/// <field name="element" type="HTMLElement">Returns a reference to the control's DOM element.</field>
			/// <field name="enabled" type="Boolean">Gets or sets whether mouse events are enabled.</field>
		},
		DomUtils: function () {
			/// <summary>Contains DOM-related helper functions.</summary>
		},
		EventArgs: function () {
			/// <summary>The base type of classes that define arguments passed to event handler functions.</summary>
			/// <field name="handled" type="Boolean">Gets or sets a value indicating whether the event has been handled.</field>
		},
		Events: function () {
			/// <summary>Defines all events raised in the Controls namespace.</summary>
			/// <field name="controlLoaded" type="String">Raised when the control is loaded.</field>
		},
		ZoomControl: function (element) {
			/// <summary>The ZoomControl lets users zoom and pan a target view control interactively.</summary>
			/// <param name="element" type="HTMLCanvasElement">HTMLCanvasElement. The Canvas DOM Element this ZoomControl is associated with.</param>
			/// <field name="activeColor" type="String">Gets or sets the color used to render depressed buttons.</field>
			/// <field name="autoPostBack" type="Boolean">Gets or sets a value indicating whether the control will post back to the server when the control's value has changed.</field>
			/// <field name="backColor" type="String">Gets or sets the background color of the control.</field>
			/// <field name="borderColor" type="String">Gets or sets the color of ZoomControl elements' borders.</field>
			/// <field name="cornerRadius" type="Number">Gets or sets the corner radius of rounded child elements.</field>
			/// <field name="enabled" type="Boolean">Gets or sets whether mouse events are enabled.</field>
			/// <field name="fill" type="String">Gets or sets the color used to fill the ZoomControl elements.</field>
			/// <field name="innerColor" type="String">Gets or sets the color of plus, minus and arrow icons.</field>
			/// <field name="maxZoomFactor" type="Number">Gets or sets the maximum zoom level allowed to set through this control.</field>
			/// <field name="minZoomFactor" type="Number">Gets or sets the minimum zoom level allowed to set through this control.</field>
			/// <field name="padding" type="Number">Gets or sets the padding of the control's contents.</field>
			/// <field name="scrollStep" type="Number">Gets or sets the scroll offset added when users click the pan arrows.</field>
			/// <field name="shadowColor" type="String">Gets or sets the color of the control elements' shadow.</field>
			/// <field name="showLabel" type="Boolean">Gets or sets a value indicating whether the label that shows the current zoom level should be visible.</field>
			/// <field name="snapToZoomStep" type="Boolean">Gets or sets a value indicating whether the trackbar should snap to zoomStep values when dragged.</field>
			/// <field name="target" type="MindFusion.Controls.Control">Gets or sets the control modified by this ZoomControl.</field>
			/// <field name="textColor" type="String">Gets or sets the color of the the label that shows the current zoom level.</field>
			/// <field name="tickPosition" type="MindFusion.Controls.TickPosition">Gets or sets the current tick position of the trackbar.</field>
			/// <field name="zoomFactor" type="Number">Gets or sets the zoom factor.</field>
			/// <field name="zoomStep" type="Number">Gets or sets the amount by which to change zoom level when + and - buttons are clicked.</field>
			/// <field name="element" type="HTMLElement">Returns a reference to the control's DOM element. Inherited from Disposable.</field>
			/// <field name="measureUnit" type="MindFusion.Controls.GraphicsUnit">Gets the unit of measure used for logical coordinates. Inherited from CanvasControl.</field>
		},
		__namespace: true
	},
	Scheduling: {
		BaseForm: function (calendar, item) {
			/// <summary>The BaseForm class is the base class for all built-in forms.</summary>
			/// <param name="calendar" type="Calendar">Calendar. The calendar parent object of this form.</param>
			/// <param name="item" type="Item">Item. The item instance associated with this form.</param>
			/// <field name="calendar" type="MindFusion.Scheduling.Calendar">Gets the calendar, displaying the form.</field>
			/// <field name="controls" type="MindFusion.Scheduling.Dictionary">Gets the controls collection.</field>
			/// <field name="formatInfo" type="Object">Gets the locale object used to format and display date and time information in the form.</field>
			/// <field name="headerText" type="String">Gets or sets the text which is displayed in the header of the form.</field>
			/// <field name="id" type="String">Gets the id of the form.</field>
			/// <field name="item" type="MindFusion.Scheduling.Item">Gets the item, whose information is displayed in the form.</field>
			/// <field name="localInfo" type="Object">Gets the locale object used to format and display localizable strings in the form.</field>
			/// <field name="type" type="String">Gets the type of the form.</field>
		},
		ButtonEventArgs: function (button) {
			/// <summary>Specifies data for the buttonClick event.</summary>
			/// <param name="button" type="Number">Number. A value indicating which navigation button is clicked.</param>
			/// <field name="button" type="Number">Gets a value indicating which navigation button is clicked.</field>
		},
		Calendar: function (element) {
			/// <summary>The Calendar control serves as a view in document-view architecture, where the document is implemented by the Schedule class. The Calendar provides several schedule related views, such as Month, List, Timetable, that present the scheduled events in different styles and layouts.</summary>
			/// <param name="element" type="DomElement">The element this Calendar is associated with.</param>
			/// <field name="allowInplaceEdit" type="Boolean">Gets or sets a value indicating whether calendar's items can be inplace-edited.</field>
			/// <field name="cells" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of cells in the calendar view.</field>
			/// <field name="contactNameFormat" type="String">Gets or sets a value indicating how to format and display contact names in view headers.</field>
			/// <field name="contacts" type="MindFusion.Scheduling.ObservableCollection">Gets the contacts whose schedule to display when the GroupType property is set to GroupByContacts or FilterByContacts.</field>
			/// <field name="currentView" type="MindFusion.Scheduling.CalendarView">Gets or sets the type of the current view of the calendar.</field>
			/// <field name="date" type="MindFusion.Scheduling.DateTime">Gets or sets the date of the calendar.</field>
			/// <field name="endDate" type="MindFusion.Scheduling.DateTime">Gets or sets the end date of the calendar.</field>
			/// <field name="endTime" type="MindFusion.Scheduling.DateTime">Gets the end time of the last calendar cell.</field>
			/// <field name="formatInfo" type="Object">Gets the locale object used to format and display date and time information in the calendar.</field>
			/// <field name="groupType" type="MindFusion.Scheduling.GroupType">Gets or sets the grouping or filtering criteria for the calendar.</field>
			/// <field name="header" type="HTMLElement">Gets a reference to the DOM element of the calendar main header.</field>
			/// <field name="itemSelection" type="MindFusion.Scheduling.ObservableCollection">Gets the list of currently selected items.</field>
			/// <field name="itemsEndTime" type="MindFusion.Scheduling.DateTime">Gets the end time of the last calendar cell, that can contain items.</field>
			/// <field name="itemSettings" type="MindFusion.Scheduling.ItemSettings">Gets the ItemSettings object used to customize the appearance of calendar items.</field>
			/// <field name="itemsStartTime" type="MindFusion.Scheduling.DateTime">Gets the start time of the first calendar cell, that can contain items.</field>
			/// <field name="listSettings" type="MindFusion.Scheduling.ListSettings">Gets the ListSettings object used to customize the appearance of the List view.</field>
			/// <field name="locale" type="MindFusion.Scheduling.Locale">Gets or sets the locale object used to format and display localizable information in the calendar.</field>
			/// <field name="localInfo" type="Object">Gets the locale object used to format and display localizable strings in the calendar.</field>
			/// <field name="locations" type="MindFusion.Scheduling.ObservableCollection">Gets the locations whose schedule to display when the groupType property is set to GroupByLocations or FilterByLocations.</field>
			/// <field name="monthRangeSettings" type="MindFusion.Scheduling.MonthRangeSettings">Gets the MonthRangeSettings object used to customize the appearance of the MonthRange view.</field>
			/// <field name="monthSettings" type="MindFusion.Scheduling.MonthSettings">Gets the MonthSettings object used to customize the appearance of the SingleMonth view.</field>
			/// <field name="resources" type="MindFusion.Scheduling.ObservableCollection">Gets the resources whose schedule to display when the groupType property is set to GroupByResources or FilterByResources.</field>
			/// <field name="resourceViewSettings" type="MindFusion.Scheduling.ResourceViewSettings">Gets the ResourceViewSettings object used to customize the appearance of the Resource view.</field>
			/// <field name="schedule" type="MindFusion.Scheduling.Schedule">Gets or sets the schedule to be displayed inside the calendar.</field>
			/// <field name="selection" type="MindFusion.Scheduling.Selection">Gets the current calendar selection.</field>
			/// <field name="showTooltips" type="Boolean">Gets or sets a value indicating whether to show tooltips.</field>
			/// <field name="startTime" type="MindFusion.Scheduling.DateTime">Gets the start time of the first calendar cell.</field>
			/// <field name="tasks" type="MindFusion.Scheduling.ObservableCollection">Gets the tasks whose schedule to display when the GroupType property is set to GroupByTasks or FilterByTasks.</field>
			/// <field name="timetableSettings" type="MindFusion.Scheduling.TimetableSettings">Gets the TimetableSettings object used to customize the appearance of the Timetable view.</field>
			/// <field name="useForms" type="Boolean">Gets or sets a value indicating whether the built-in forms for item editing will be used.</field>
			/// <field name="weekRangeSettings" type="MindFusion.Scheduling.WeekRangeSettings">Gets the WeekRangeSettings object used to customize the appearance of the WeekRange view.</field>
			/// <field name="buttonClick" type="EventDispatcher">Raised when a navigation button is clicked. Syntax: buttonClick.addEventListener( function(sender, args){} );</field>
			/// <field name="cellClick" type="EventDispatcher">Raised when a calendar time cell is clicked. Syntax: cellClick.addEventListener( function(sender, args){} );</field>
			/// <field name="cellDoubleClick" type="EventDispatcher">Raised when a calendar time cell is double-clicked. Syntax: cellDoubleClick.addEventListener( function(sender, args){} );</field>
			/// <field name="cueClick" type="EventDispatcher">Raised when an item cue is clicked. Syntax: cueClick.addEventListener( function(sender, args){} );</field>
			/// <field name="formClose" type="EventDispatcher">Raised when a popup form is closed. Syntax: formClose.addEventListener( function(sender, args){} );</field>
			/// <field name="formShow" type="EventDispatcher">Raised when a popup form is shown. Syntax: formShow.addEventListener( function(sender, args){} );</field>
			/// <field name="headerClick" type="EventDispatcher">Raised when a calendar header is clicked. Syntax: headerClick.addEventListener( function(sender, args){} );</field>
			/// <field name="headerDoubleClick" type="EventDispatcher">Raised when a calendar header is double-clicked. Syntax: headerDoubleClick.addEventListener( function(sender, args){} );</field>
			/// <field name="itemClick" type="EventDispatcher">Raised when an item is clicked. Syntax: itemClick.addEventListener( function(sender, args){} );</field>
			/// <field name="itemCreated" type="EventDispatcher">Raised when an item is created. Syntax: itemCreated.addEventListener( function(sender, args){} );</field>
			/// <field name="itemCreating" type="EventDispatcher">Raised while an item is being created. Syntax: itemCreating.addEventListener( function(sender, args){} );</field>
			/// <field name="itemDeleted" type="EventDispatcher">Raised when an item is deleted. Syntax: itemDeleted.addEventListener( function(sender, args){} );</field>
			/// <field name="itemDeleting" type="EventDispatcher">Raised while an item is being deleted. Syntax: itemDeleting.addEventListener( function(sender, args){} );</field>
			/// <field name="itemDoubleClick" type="EventDispatcher">Raised when an item is double-clicked. Syntax: itemDoubleClick.addEventListener( function(sender, args){} );</field>
			/// <field name="itemDraw" type="EventDispatcher">Raised when an item is drawn. Syntax: itemDraw.addEventListener( function(sender, args){} );</field>
			/// <field name="itemModified" type="EventDispatcher">Raised when an item is modified. Syntax: itemModified.addEventListener( function(sender, args){} );</field>
			/// <field name="itemModifying" type="EventDispatcher">Raised while an item is being modified. Syntax: itemModifying.addEventListener( function(sender, args){} );</field>
			/// <field name="itemReminderTriggered" type="EventDispatcher">Raised when an item remider is triggered. Syntax: itemReminderTriggered.addEventListener( function(sender, args){} );</field>
			/// <field name="itemSelectionChanged" type="EventDispatcher">Raised when a selection of items changes. Syntax: itemSelectionChanged.addEventListener( function(sender, args){} );</field>
			/// <field name="recurringItemDeleting" type="EventDispatcher">Raised while a recurring item is being deleted. Syntax: recurringItemDeleting.addEventListener( function(sender, args){} );</field>
			/// <field name="scheduleChanged" type="EventDispatcher">Raised when the calendar's schedule has changed. Syntax: scheduleChanged.addEventListener( function(sender, args){} );</field>
			/// <field name="selectionChanged" type="EventDispatcher">Raised when a selection changes. Syntax: selectionChanged.addEventListener( function(sender, args){} );</field>
			/// <field name="selectionEnd" type="EventDispatcher">Raised when a selection has ended. Syntax: selectionEnd.addEventListener( function(sender, args){} );</field>
			/// <field name="selectionStart" type="EventDispatcher">Raised when a selection is started. Syntax: selectionStart.addEventListener( function(sender, args){} );</field>
			/// <field name="taskReminderTriggered" type="EventDispatcher">Raised when an task remider is triggered. Syntax: taskReminderTriggered.addEventListener( function(sender, args){} );</field>
			/// <field name="visibleDateChanged" type="EventDispatcher">Raised when the calendar date is changed. Syntax: visibleDateChanged.addEventListener( function(sender, args){} );</field>
		},
		CellEventArgs: function (cell) {
			/// <summary>Specifies data for cell related events.</summary>
			/// <param name="cell" type="ViewCell">ViewCell. The calendar view cell related to the event.</param>
			/// <field name="cell" type="MindFusion.Scheduling.ViewCell">Gets the calendar view cell related to the event.</field>
		},
		Contact: function () {
			/// <summary>Represents an object that holds contact data for a person.</summary>
			/// <field name="address" type="String">Gets or sets the address of the contact.</field>
			/// <field name="email" type="String">Gets or sets the email of the contact.</field>
			/// <field name="firstName" type="String">Gets or sets the first name of the contact.</field>
			/// <field name="lastName" type="String">Gets or sets the last name of the contact.</field>
			/// <field name="middleName" type="String">Gets or sets the middle name of the contact.</field>
			/// <field name="phone" type="String">Gets or sets the phone of the contact.</field>
			/// <field name="id" type="String">Gets or sets the string identifier for this resource. Inherited from Resource.</field>
			/// <field name="name" type="String">Gets or sets the name for this resource. Inherited from Resource.</field>
			/// <field name="tag" type="Object">Gets or sets custom data associated with the resource. Inherited from Resource.</field>
		},
		DateChangedEventArgs: function (newDate, prevDate) {
			/// <summary>Specifies data for the visibleDateChanged event.</summary>
			/// <param name="newDate" type="DateTime">DateTime. The new visible date.</param>
			/// <param name="prevDate" type="DateTime">DateTime. The previous visible date.</param>
			/// <field name="newDate" type="MindFusion.Scheduling.DateTime">Gets the new visible date.</field>
			/// <field name="prevDate" type="MindFusion.Scheduling.DateTime">Gets the previous visible date.</field>
		},
		DateTime: function (date) {
			/// <summary>A Javascript Date object wrapper that extends the functionality of the JavaScript Date object.</summary>
			/// <param name="date" type="Date">Date. A JavaScript Date object.</param>
			/// <field name="date" type="MindFusion.Scheduling.DateTime">Gets the date component of this DateTime object.</field>
			/// <field name="day" type="Number">Gets the day component of the date represented by this DateTime&#160;instance.</field>
			/// <field name="dayOfWeek" type="Number">Gets the day of the week represented by this DateTime.</field>
			/// <field name="daysInMonth" type="Number">Gets the number of days in the month represented by this DateTime.</field>
			/// <field name="hour" type="Number">Gets the hour component of the date represented by this DateTime&#160;instance.</field>
			/// <field name="millisecond" type="Number">Gets the millisecond component of the date represented by this DateTime instance.</field>
			/// <field name="minute" type="Number">Gets the minute component of the date represented by this DateTime instance.</field>
			/// <field name="month" type="Number">Gets the month component of the date represented by this DateTime instance.</field>
			/// <field name="second" type="Number">Gets the second component of the date represented by this DateTime&#160;instance.</field>
			/// <field name="timeOfDay" type="Number">Gets the time component of this DateTime object, expressed in milliseconds.</field>
			/// <field name="year" type="Number">Gets the year component of the date represented by this DateTime instance.</field>
		},
		FormEventArgs: function (form) {
			/// <summary>Specifies data for form related events.</summary>
			/// <param name="form" type="BaseForm">BaseForm. The form instance related to the event.</param>
			/// <field name="form" type="MindFusion.Scheduling.BaseForm">Gets the form related to the event.</field>
		},
		HeaderEventArgs: function (type) {
			/// <summary>Specifies data for header related events.</summary>
			/// <param name="type" type="HeaderType">HeaderType. The type of the header related to the event.</param>
			/// <field name="type" type="MindFusion.Scheduling.HeaderType">Gets the type of the header related to the event.</field>
		},
		Item: function () {
			/// <summary>Represents appointments within a schedule.</summary>
			/// <field name="allDayEvent" type="Boolean">Gets or sets a value indicating whether the item represents an all day event.</field>
			/// <field name="allowChangeEnd" type="Boolean">Gets or sets a value indicating whether users are allowed to change the item's end time.</field>
			/// <field name="allowChangeStart" type="Boolean">Gets or sets a value indicating whether users are allowed to change the item's start time.</field>
			/// <field name="allowMove" type="Boolean">Gets or sets a value indicating whether users are allowed to move the Item.</field>
			/// <field name="contacts" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of contacts associated with this Item.</field>
			/// <field name="cssClass" type="String">Gets or sets the css class of the Item.</field>
			/// <field name="details" type="String">Gets or sets the description rendered for this Item by the scheduling control.</field>
			/// <field name="endTime" type="MindFusion.Scheduling.DateTime">Gets or sets Item's scheduled end time.</field>
			/// <field name="id" type="String">Gets or sets the string identifier of this item.</field>
			/// <field name="location" type="MindFusion.Scheduling.Location">Gets or sets the location associated with this Item.</field>
			/// <field name="locked" type="Boolean">Gets or sets a value indicating whether users are forbidden to modify this item.</field>
			/// <field name="occurrenceIndex" type="Number">Gets the index of a repeating occurrence of a recurring Item.</field>
			/// <field name="priority" type="Number">Gets or sets the priority of the Item.</field>
			/// <field name="recurrence" type="MindFusion.Scheduling.Recurrence">&#160;Gets or sets the recurrence pattern of this item.</field>
			/// <field name="recurrenceState" type="MindFusion.Scheduling.RecurrenceState">Gets the recurrence state of this Item.</field>
			/// <field name="reminder" type="MindFusion.Scheduling.Reminder">Gets or sets the Reminder for this Item.</field>
			/// <field name="resources" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of Resources associated with this Item.</field>
			/// <field name="startTime" type="MindFusion.Scheduling.DateTime">Gets or sets Item's scheduled start time.</field>
			/// <field name="subject" type="String">Gets or sets the text rendered in the header for this Item by the scheduling control.</field>
			/// <field name="tag" type="Object">Gets or sets custom data associated with the item.</field>
			/// <field name="task" type="MindFusion.Scheduling.Task">Gets or sets the Task associated with this Item.</field>
			/// <field name="visible" type="Boolean">Gets or sets a value indicating whether the Item is visible or not.</field>
		},
		ItemEventArgs: function (item, rawEventArgs) {
			/// <summary>Specifies data for the item related events.</summary>
			/// <param name="item" type="Item">Item. The item, associated with the event.</param>
			/// <param name="rawEventArgs" type="Object">Object. The Javascript event data.</param>
			/// <field name="item" type="MindFusion.Scheduling.Item">Gets the item, associated with the event.</field>
			/// <field name="rawEventArgs" type="Object">Gets the Javascript event data.</field>
		},
		ItemModifiedEventArgs: function (item, oldItem, action) {
			/// <summary>Specifies data for the itemModified event.</summary>
			/// <param name="item" type="Item">Item. The new item.</param>
			/// <param name="oldItem" type="Item">Item. The old item.</param>
			/// <param name="action" type="ItemModifyAction">One of the ItemModifyAction&#160;enumeration values. The action that has modified the item.</param>
			/// <field name="action" type="MindFusion.Scheduling.ItemModifyAction">Gets the type of action that is modifying the item.</field>
			/// <field name="item" type="MindFusion.Scheduling.Item">Gets the Item that was modified.</field>
			/// <field name="oldItem" type="MindFusion.Scheduling.Item">Gets the Item before the modification has occurred.</field>
		},
		ItemModifyingEventArgs: function (item, changes, action) {
			/// <summary>Specifies data for the itemModifying event.</summary>
			/// <param name="item" type="Item">Item. The new item.</param>
			/// <param name="changes" type="Object">Object. An object containing the changed properties.</param>
			/// <param name="action" type="ItemModifyAction">One of the ItemModifyAction&#160;enumeration values. The action that is modifying the item.</param>
			/// <field name="action" type="MindFusion.Scheduling.ItemModifyAction">Gets the type of action that is modifying the Item.</field>
			/// <field name="changes" type="Object">Gets the changed properties of the Item, associated with the event.</field>
			/// <field name="item" type="MindFusion.Scheduling.Item">Gets the item that is modified.</field>
		},
		ItemSettings: function () {
			/// <summary>Defines properties that enable appearance customization of schedule Item-s in the calendar views.</summary>
			/// <field name="cssClass" type="String">Gets or sets the default CSS class for all appointments whose CSS is not explicitly specified.</field>
			/// <field name="showContinuationArrows" type="Boolean">Gets or sets a value indicating whether to display small arrows at the beginning or at the end of each incomplete segment to indicate that the schedule Item continues in an adjacent calendar cell.</field>
			/// <field name="showCues" type="Boolean">Gets or sets a value indicating whether to display a 'more items' link in a calendar cell which isn't big enough to contain all of its items.</field>
			/// <field name="showItems" type="Boolean">Gets or sets a value indicating whether to display schedule Item-s.</field>
			/// <field name="size" type="Number">Gets or sets the size of schedule items drawn in the calendar.</field>
			/// <field name="spacing" type="Number">Gets or sets the amount of space between adjacent Item-s.</field>
			/// <field name="titleFormat" type="String">Gets or sets a value indicating how to format and display item titles.</field>
			/// <field name="tooltipFormat" type="String">Gets or sets a value indicating how to format and display item tooltips.</field>
		},
		JsonPersistContext: function () {
			/// <summary>Provides methods that read/write schedule data to and from JSON.</summary>
			/// <field name="schedule" type="MindFusion.Scheduling.Schedule">Gets a reference to the Schedule object being serialized.</field>
		},
		ListSettings: function () {
			/// <summary>Defines properties that allow customization of the appearance of a List view.</summary>
			/// <field name="cellUnits" type="MindFusion.Scheduling.TimeUnit">Gets or sets the resolution of the list view.</field>
			/// <field name="firstDayOfMonthFormat" type="String">Gets or sets the string used to format the cell header of the first day of each month.</field>
			/// <field name="firstDayOfYearFormat" type="String">Gets or sets the string used to format the cell header of the first day of each year.</field>
			/// <field name="generalFormat" type="String">Gets or sets the string used to format cells' headers.</field>
			/// <field name="headerStyle" type="MindFusion.Scheduling.MainHeaderStyle">Gets or sets the style of the view header.</field>
			/// <field name="maxItems" type="MindFusion.Scheduling.Number">Gets or sets the maximum number of items to display in a cell.</field>
			/// <field name="numberOfCells" type="MindFusion.Scheduling.Number">Gets or sets the total number of cells to be displayed in the view.</field>
			/// <field name="orientation" type="MindFusion.Scheduling.Orientation">Gets or sets the orientation of the view.</field>
			/// <field name="titleFormat" type="String">Gets or sets the string used to format the header title.</field>
			/// <field name="visibleCells" type="MindFusion.Scheduling.Number">Gets or sets the number of cells visible at the same time.</field>
		},
		LocalStrings: function () {
			/// <summary>Contains the dictionary of localizable caption texts for the Calendar control.</summary>
			/// <field name="allDayEventCaption" type="String">Specifies the caption text of the "All day event" checkbox in Edit form.</field>
			/// <field name="cancelButtonCaption" type="String">Specifies the caption text a "Cancel" button in a form.</field>
			/// <field name="contactsCaption" type="String">Specifies the caption text of the "Contacts" input in Edit form.</field>
			/// <field name="cueFormHeader" type="String">Specifies the header text of the Cue Items form.</field>
			/// <field name="dailyValue" type="String">Specifies the text of the "Daily" option in a Recurrence pattern drop-down.</field>
			/// <field name="daysValue" type="String">Specifies the text of the "Days" option in a Reminder drop-down.</field>
			/// <field name="dayValue" type="String">Specifies the text of the "Day" option in a Reminder drop-down.</field>
			/// <field name="deleteButtonCaption" type="String">Specifies the caption text a "Delete" button in a form.</field>
			/// <field name="detailsCaption" type="String">Specifies the caption text of the "Details" input in Edit form.</field>
			/// <field name="editFormHeader" type="String">Specifies the header text of the Edit form.</field>
			/// <field name="editRecurrenceFormHeader" type="String">Specifies the header text of the Edit Recurrence form.</field>
			/// <field name="endAfterCaption" type="String">Specifies the caption text of the "End after" input in Recurrence form.</field>
			/// <field name="endDateCaption" type="String">Specifies the caption text of the "End by" input in Recurrence form.</field>
			/// <field name="endTimeCaption" type="String">Specifies the caption text of the "End time" label in Edit form.</field>
			/// <field name="everyCaption" type="String">Specifies the caption text of the "Every" input in Recurrence form.</field>
			/// <field name="firstValue" type="String">Specifies the text of the "First" option in a Recurrence pattern drop-down.</field>
			/// <field name="fourthValue" type="String">Specifies the text of the "Fourth" option in a Recurrence pattern drop-down.</field>
			/// <field name="hoursValue" type="String">Specifies the text of the "Hours" option in a Reminder drop-down.</field>
			/// <field name="hourValue" type="String">Specifies the text of the "Hour" option in a Reminder drop-down.</field>
			/// <field name="intervalValue" type="String">Specifies the text of the "Time interval" option in a Recurrence pattern drop-down.</field>
			/// <field name="lastValue" type="String">Specifies the text of the "Last" option in a Recurrence pattern drop-down.</field>
			/// <field name="locationCaption" type="String">Specifies the caption text of the "Location" input in Edit form.</field>
			/// <field name="minutesValue" type="String">Specifies the text of the "Minutes" option in a Reminder drop-down.</field>
			/// <field name="monthlyValue" type="String">Specifies the text of the "Monthly" option in a Recurrence pattern drop-down.</field>
			/// <field name="monthValue" type="String">Specifies the caption text of the "Month" input in Recurrence form.</field>
			/// <field name="newFormHeader" type="String">Specifies the header text of the New form.</field>
			/// <field name="newRecurrenceFormHeader" type="String">Specifies the header text of the New Recurrence form.</field>
			/// <field name="noEndCaption" type="String">Specifies the caption text of the "No end date" input in Recurrence form.</field>
			/// <field name="ofEveryCaption" type="String">Specifies the caption text of the "of Every" input in Recurrence form.</field>
			/// <field name="optionsButtonCaption" type="String">Specifies the caption text a "Options" button in a form.</field>
			/// <field name="patternCaption" type="String">Specifies the caption text of the "Pattern" input in Recurrence form.</field>
			/// <field name="recurrenceButtonCaption" type="String">Specifies the caption text a "Recurrence" button in a form.</field>
			/// <field name="recurrenceDailyFourPattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceDailyOnePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceDailyThreePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceDailyTwoPattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceEndDatePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceIntervalPattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceMonthlyOnePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceMonthlyTwoPattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceStartDatePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceTimeOnePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceTimeTwoPattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceWeeklyOnePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceWeeklyTwoPattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceYearlyOnePattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="recurrenceYearlyTwoPattern" type="String">Specifies a pattern in the RecurrenceInfo text.</field>
			/// <field name="reminderCaption" type="String">Specifies the caption text of the "Reminder" checkbox in Edit form.</field>
			/// <field name="saveButtonCaption" type="String">Specifies the caption text a "Save" button in a form.</field>
			/// <field name="secondsValue" type="String">Specifies the caption text of the "Seconds" input in Recurrence form.</field>
			/// <field name="secondValue" type="String">Specifies the text of the "Second" option in a Recurrence pattern drop-down.</field>
			/// <field name="startCaption" type="String">Specifies the caption text of the "Start" input in Recurrence form.</field>
			/// <field name="startTimeCaption" type="String">Specifies the caption text of the "Start time" label in Edit form.</field>
			/// <field name="subjectCaption" type="String">Specifies the caption text of the "Subject" label in Edit form.</field>
			/// <field name="thirdValue" type="String">Specifies the text of the "Third" option in a Recurrence pattern drop-down.</field>
			/// <field name="todayCaption" type="String">Specifies the caption text of the "Today" button in a date picker control.</field>
			/// <field name="weekdayValue" type="String">Specifies the text of the "Weekday" option in a Recurrence pattern drop-down.</field>
			/// <field name="weekendValue" type="String">Specifies the text of the "Weekend" option in a Recurrence pattern drop-down.</field>
			/// <field name="weeklyValue" type="String">Specifies the text of the "Weekly" option in a Recurrence pattern drop-down.</field>
			/// <field name="weeksValue" type="String">Specifies the caption text of the "Weeks" input in Recurrence form.</field>
			/// <field name="yearlyValue" type="String">Specifies the text of the "Yearly" option in a Recurrence pattern drop-down.</field>
		},
		Location: function () {
			/// <summary>Specifies data that identifies a location.</summary>
			/// <field name="address" type="String">Gets or sets the address of the Location.</field>
			/// <field name="city" type="String">Gets or sets the city of the Location.</field>
			/// <field name="country" type="String">Gets or sets the country of the Location.</field>
			/// <field name="state" type="String">Gets or sets the state of the location.</field>
			/// <field name="zipCode" type="String">Gets or sets the zip code of the location.</field>
			/// <field name="id" type="String">Gets or sets the string identifier for this resource. Inherited from Resource.</field>
			/// <field name="name" type="String">Gets or sets the name for this resource. Inherited from Resource.</field>
			/// <field name="tag" type="Object">Gets or sets custom data associated with the resource. Inherited from Resource.</field>
		},
		MonthRangeSettings: function () {
			/// <summary>Defines properties that allow customization of the appearance of a MonthRange view.</summary>
			/// <field name="headerStyle" type="MindFusion.Scheduling.MainHeaderStyle">Gets or sets the style of the view header.</field>
			/// <field name="monthsPerRow" type="Number">Gets or sets the number of months to be displayed in a row.</field>
			/// <field name="numberOfMonths" type="Number">Gets or sets the total number of months to be displayed in the MonthRange view.</field>
			/// <field name="titleFormat" type="String">Gets or sets the string used to format the header title.</field>
			/// <field name="titleSeparator" type="String">Gets or sets the string used as a title separator.</field>
			/// <field name="visibleRows" type="Number">Gets or sets the number of rows visible at the same time.</field>
		},
		MonthSettings: function () {
			/// <summary>Defines properties that allow customization of the appearance of a Month view.</summary>
			/// <field name="dayNamesHeaderStyle" type="MindFusion.Scheduling.HorizontalHeaderStyle">Gets or sets the style of the view day names header.</field>
			/// <field name="dayOfWeekFormat" type="MindFusion.Scheduling.DayOfWeekFormat">Gets or sets the format of the day names displayed in the day names header.</field>
			/// <field name="expandDayHeaders" type="Boolean">Gets or sets a value indicating whether day headers should fill the whole day cell.</field>
			/// <field name="firstDayOfMonthFormat" type="String">Gets or sets the string used to format the cell header of the first day of each month.</field>
			/// <field name="firstDayOfYearFormat" type="String">Gets or sets the string used to format the cell header of the first day of each year.</field>
			/// <field name="generalFormat" type="String">Gets or sets the string used to format cells' headers.</field>
			/// <field name="headerStyle" type="MindFusion.Scheduling.MainHeaderStyle">Gets or sets the style of the view header.</field>
			/// <field name="hideTrailingWeeks" type="Boolean">Gets or sets a value indicating whether to hide trailing weeks, which do not contain days from the current month.</field>
			/// <field name="leadingWeekCount" type="Number">Gets or sets the number of full weeks to display from the previous month.</field>
			/// <field name="maxItems" type="Number">Gets or sets the maximum number of items to display in a cell.</field>
			/// <field name="showPaddingDays" type="Boolean">Gets or sets a value indicating whether to display days from theprevious and next months at the beginning and the end of the current one, in order to fill the whole grid of day cells.</field>
			/// <field name="showPaddingItems" type="Boolean">Gets or sets a value indicating whether items are shown in padding days.</field>
			/// <field name="titleFormat" type="String">Gets or sets the string used to format the header title.</field>
			/// <field name="trailingWeekCount" type="Number">Gets or sets the number of full weeks to display from the next month.</field>
			/// <field name="weekHeaderStyle" type="MindFusion.Scheduling.VerticalHeaderStyle">Gets or sets the style of the view week numbers header.</field>
		},
		Recurrence: function () {
			/// <summary>Defines recurrence patterns for items scheduled to repeat over and over again.</summary>
			/// <field name="daily" type="MindFusion.Scheduling.DailyRecurrence">Gets or sets the type of daily recurrence.</field>
			/// <field name="day" type="MindFusion.Scheduling.DayOfWeekType">Gets or sets a value indicating the day of the week when the event occurs.</field>
			/// <field name="dayOfMonth" type="Number">Gets or sets the day of the month when the event occurs.</field>
			/// <field name="days" type="Number">Gets or sets the number of days between two consecutive occurrences of the same event.</field>
			/// <field name="daysOfWeek" type="MindFusion.Scheduling.DaysOfWeek">Gets or sets the days of the week when the event occurs.</field>
			/// <field name="end" type="MindFusion.Scheduling.RecurrenceEnd">Gets orsets the last time when the event occurs.</field>
			/// <field name="endDate" type="MindFusion.Scheduling.DateTime">Gets or sets the end date of the Recurrence.</field>
			/// <field name="exceptions" type="MindFusion.Scheduling.Dictionary">Gets a list with all Recurrence exceptions.</field>
			/// <field name="interval" type="Number">Gets or sets the interval of Recurrence.</field>
			/// <field name="master" type="MindFusion.Scheduling.Item">Gets the master item for the recurrence.</field>
			/// <field name="monthly" type="MindFusion.Scheduling.MonthlyRecurrence">Gets or sets the type of monthly recurrence.</field>
			/// <field name="monthOfYear" type="Number">Gets or sets the month of the year when the event occurs.</field>
			/// <field name="months" type="Number">Gets or sets the number of months between two consecutive occurrences of the same event.</field>
			/// <field name="numOccurrences" type="Number">Gets or sets how many times a recurring event should occur.</field>
			/// <field name="occurrence" type="MindFusion.Scheduling.Occurrence">Gets or sets on which occurrence of the week within the month the event occurs.</field>
			/// <field name="pattern" type="MindFusion.Scheduling.RecurrencePattern">Gets or sets the recurrence pattern.</field>
			/// <field name="startDate" type="MindFusion.Scheduling.DateTime">Gets or sets the date and time of the event's first occurrence.</field>
			/// <field name="weeks" type="Number">Gets or sets the number of weeks between two consecutive occurrences of the event.</field>
			/// <field name="yearly" type="MindFusion.Scheduling.YearlyRecurrence">Gets or sets the type of yearly recurrence.</field>
		},
		Reminder: function () {
			/// <summary>Represents reminders associated with schedule Item-s.</summary>
			/// <field name="message" type="String">Gets or sets the message to display as a Reminder.</field>
			/// <field name="time" type="MindFusion.Scheduling.DateTime">Gets or sets the time when the Reminder is triggered.</field>
			/// <field name="timeInterval" type="MindFusion.Scheduling.TimeSpan">Gets or sets how much time before the item's scheduled start time to raise the event that triggers the Reminder.</field>
			/// <field name="type" type="MindFusion.Scheduling.ReminderType">Gets or sets the type of this Reminder.</field>
		},
		Resource: function () {
			/// <summary>Instances of the Resource class contain information about arbitrary resources.</summary>
			/// <field name="id" type="String">Gets or sets the string identifier for this resource.</field>
			/// <field name="name" type="String">Gets or sets the name for this resource.</field>
			/// <field name="tag" type="Object">Gets or sets custom data associated with the resource.</field>
		},
		ResourceViewSettings: function () {
			/// <summary>Defines properties that allow customization of the appearance of a Resource view.</summary>
			/// <field name="bottomTimelineSettings" type="MindFusion.Scheduling.TimelineSettings">Gets the settings for the bottom timeline.</field>
			/// <field name="middleTimelineSettings" type="MindFusion.Scheduling.TimelineSettings">Gets the settings for the middle timeline.</field>
			/// <field name="timelines" type="Number">Gets or sets the number of timelines displayed in the view.</field>
			/// <field name="topTimelineSettings" type="MindFusion.Scheduling.TimelineSettings">Gets the settings for the top timeline.</field>
			/// <field name="visibleCells" type="Number">Gets or sets the number of cells visible at the same time.</field>
		},
		Schedule: function () {
			/// <summary>Represents a timetable of scheduled events. In the model-view architecture, Schedule instances are the documents whose data is displayed by Calendar instances, which are the views.</summary>
			/// <field name="contacts" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of contacts in this schedule.</field>
			/// <field name="items" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of items in this schedule.</field>
			/// <field name="locations" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of locations in this schedule.</field>
			/// <field name="resources" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of resources in this schedule.</field>
			/// <field name="tasks" type="MindFusion.Scheduling.ObservableCollection">Gets the collection of tasks in this schedule.</field>
			/// <field name="itemsChanged" type="EventDispatcher">Raised when the items collection of the Schedule&#160;is changed. Syntax: itemsChanged.addEventListener( function(sender, args){} );</field>
			/// <field name="itemsChanging" type="EventDispatcher">Raised when the items collection of the Schedule is changing. Syntax: itemsChanging.addEventListener( function(sender, args){} );</field>
		},
		Selection: function () {
			/// <summary>Represents a selected date-time range.</summary>
			/// <field name="allowMultiple" type="Boolean">Gets or sets a value indicating whether users are allowed to select more than one date cell at a time.</field>
			/// <field name="enabled" type="Boolean">Gets or sets a value indicating whether users are allowed to select date cells.</field>
		},
		SelectionEventArgs: function (startTime, endTime, resource) {
			/// <summary>Specifies data for selection related events.</summary>
			/// <param name="startTime" type="DateTime">A DateTime that indicates the start time of the selection.</param>
			/// <param name="endTime" type="DateTime">A DateTime that indicates the end time of the selection.</param>
			/// <param name="resource" type="Resource">The Resource related to the event.</param>
			/// <field name="endTime" type="MindFusion.Scheduling.DateTime">Gets the end time of the selection.</field>
			/// <field name="resource" type="MindFusion.Scheduling.Resource">Gets the resource related to the event.</field>
			/// <field name="startTime" type="MindFusion.Scheduling.DateTime">Gets the start time of the selection.</field>
		},
		Task: function () {
			/// <summary>Represents a task in the calendar.</summary>
			/// <field name="actualCost" type="Number">Gets or sets the actual cost of the Task.</field>
			/// <field name="actualDuration" type="Number">Gets or sets the actual duration of the Task.</field>
			/// <field name="actualEnd" type="MindFusion.Scheduling.DateTime">Gets or sets the actual completion date of this Task.</field>
			/// <field name="actualStart" type="MindFusion.Scheduling.DateTime">Gets or sets the actual start date of the Task.</field>
			/// <field name="details" type="String">Gets or sets the details of the Task.</field>
			/// <field name="dueDate" type="MindFusion.Scheduling.DateTime">Gets or sets the due date of the Task.</field>
			/// <field name="estimatedCost" type="Number">Gets or sets the estimated cost of the Task.</field>
			/// <field name="estimatedDuration" type="Number">Gets or sets the estimated duration of the Task.</field>
			/// <field name="priority" type="MindFusion.Scheduling.TaskPriority">Gets or sets the priority of the Task.</field>
			/// <field name="progress" type="Number">Gets or sets the progress of the Task.</field>
			/// <field name="reminder" type="MindFusion.Scheduling.Reminder">Gets or sets the reminder of the Task.</field>
			/// <field name="startDate" type="MindFusion.Scheduling.DateTime">Gets or sets the start date of the Task.</field>
			/// <field name="status" type="MindFusion.Scheduling.TaskStatus">Gets or sets the status of the Task.</field>
			/// <field name="subject" type="String">Gets or sets the subject of the Task.</field>
			/// <field name="id" type="String">Gets or sets the string identifier for this resource. Inherited from Resource.</field>
			/// <field name="name" type="String">Gets or sets the name for this resource. Inherited from Resource.</field>
			/// <field name="tag" type="Object">Gets or sets custom data associated with the resource. Inherited from Resource.</field>
		},
		TaskEventArgs: function (task) {
			/// <summary>Specifies data for Task related events.</summary>
			/// <param name="task" type="Task">Task. The Task instance for which the event is raised.</param>
			/// <field name="task" type="MindFusion.Scheduling.Task">Gets the Task instance for which the event is raised.</field>
		},
		TimelineSettings: function () {
			/// <summary>Defines properties that allow customization of the appearance of timelines in a Resource view.</summary>
			/// <field name="format" type="String">Gets or sets the string used to format timeline headers.</field>
			/// <field name="unit" type="MindFusion.Scheduling.TimeUnit">Gets the resolution of the timeline.</field>
			/// <field name="unitCount" type="MindFusion.Scheduling.Number">Gets or sets the number of units between adjacent ticks in the timeline.</field>
		},
		TimeRange: function (start, end) {
			/// <summary>Represents a date-time range.</summary>
			/// <param name="start" type="DateTime">DateTime. The beginning of the range.</param>
			/// <param name="end" type="DateTime">DateTime. The end of the range.</param>
			/// <field name="end" type="MindFusion.Scheduling.DateTime">Gets or sets the end of the range.</field>
			/// <field name="isEmpty" type="Boolean">Gets a value indicating whether the range is empty.</field>
			/// <field name="start" type="MindFusion.Scheduling.DateTime">Gets or sets the beginning of the range.</field>
		},
		TimeSpan: function (ticks) {
			/// <summary>Represents a time interval.</summary>
			/// <param name="ticks" type="Number">Number. The number of ticks that represent the value of the time span.</param>
			/// <field name="days" type="Number">Gets the number of days that represent the value of this TimeSpan.</field>
			/// <field name="hours" type="Number">Gets the number of hours that represent the value of this TimeSpan.</field>
			/// <field name="milliseconds" type="Number">Gets the number of milliseconds that represent the value of this TimeSpan.</field>
			/// <field name="minutes" type="Number">Gets the number of minutes that represent the value of this TimeSpan.</field>
			/// <field name="seconds" type="Number">Gets the number of seconds that represent the value of this TimeSpan.</field>
			/// <field name="ticks" type="Number">Gets the number of ticks that represent the value of this TimeSpan.</field>
		},
		TimetableSettings: function () {
			/// <summary>Defines properties that allow customization of the appearance of a Timetable view.</summary>
			/// <field name="cellSize" type="Number">Gets or sets the size of time cells.</field>
			/// <field name="cellTime" type="MindFusion.Scheduling.TimeSpan">Gets or sets the time length of a single cell in a timetable view, accurate to the nearest second.</field>
			/// <field name="dates" type="MindFusion.Scheduling.ObservableCollection">Gets or sets the collection of dates to display in the view.</field>
			/// <field name="endTime" type="Number">Gets or sets the end time of the timetable, expressed in minutes since the beginning of the day.</field>
			/// <field name="groupHours" type="Boolean">Gets or sets a value indicating whether hours displayed in the timeline are grouped.</field>
			/// <field name="headerStyle" type="MindFusion.Scheduling.MainHeaderStyle">Gets or sets the style of the view header.</field>
			/// <field name="maxItems" type="Number">Gets or sets the maximum number of items to display in a cell.</field>
			/// <field name="orientation" type="MindFusion.Scheduling.Orientation">Gets or sets the orientation of the view.</field>
			/// <field name="reverseGrouping" type="Boolean">Gets or sets a value indicating whether grouping (if enabled) will be performed first by the resource, and then by the date.</field>
			/// <field name="scrollStep" type="Number">Gets or sets the number of days to scroll when the user clicks the navigation buttons.</field>
			/// <field name="showAM" type="Boolean">Gets or sets a value indicating whether the AM and PM suffixes are displayed.</field>
			/// <field name="showDayHeader" type="Boolean">Gets or sets a value indicating whether to show the header displaying all-day items.</field>
			/// <field name="showMinutes" type="Boolean">Gets or sets a value indicating whether to display the minutes of each hour in the timeline header when it displays whole hour cells.</field>
			/// <field name="startTime" type="Number">Gets or sets the start time of the timetable, expressed in minutes since the beginning of the day.</field>
			/// <field name="titleFormat" type="String">Gets or sets the string used to format the header title.</field>
			/// <field name="twelveHourFormat" type="Boolean">Gets or sets value indicating whether to use a 12-hour format.</field>
		},
		ViewCell: function () {
			/// <summary>Encapsulates data for a datetime cell in a calendar view.</summary>
			/// <field name="bgCell" type="MindFusion.Scheduling.DOMElement">Gets DOM element of the cell's content.</field>
			/// <field name="endTime" type="MindFusion.Scheduling.DateTime">Gets the end time of the ViewCell.</field>
			/// <field name="index" type="MindFusion.Scheduling.Number">Gets the index of the cell.</field>
			/// <field name="isHeader" type="MindFusion.Scheduling.Boolean">Gets a value indicating whether this cell is a header cell.</field>
			/// <field name="resource" type="MindFusion.Scheduling.Resource">Gets the resource associated with the cell.</field>
			/// <field name="startTime" type="MindFusion.Scheduling.DateTime">Gets the start time of the ViewCell.</field>
			/// <field name="title" type="MindFusion.Scheduling.DOMElement">Gets DOM element of the cell's header.</field>
		},
		WeekRangeSettings: function () {
			/// <summary>Defines properties that allow customization of the appearance of a WeekRange view.</summary>
			/// <field name="dayNamesHeaderStyle" type="MindFusion.Scheduling.HorizontalHeaderStyle">Gets or sets the style of the view day names header.</field>
			/// <field name="dayOfWeekFormat" type="MindFusion.Scheduling.DayOfWeekFormat">Gets or sets the format of the day names displayed in the day names header.</field>
			/// <field name="expandDayHeaders" type="MindFusion.Scheduling.Boolean">Gets or sets a value indicating whether day headers should fill the whole day cell.</field>
			/// <field name="firstDayOfMonthFormat" type="String">Gets or sets the string used to format the cell header of the first day of each month.</field>
			/// <field name="firstDayOfYearFormat" type="String">Gets or sets the string used to format the cell header of the first day of each year.</field>
			/// <field name="generalFormat" type="String">Gets or sets the string used to format cells' headers.</field>
			/// <field name="headerStyle" type="MindFusion.Scheduling.MainHeaderStyle">Gets or sets the style of the view header.</field>
			/// <field name="maxItems" type="MindFusion.Scheduling.Number">Gets or sets the maximum number of items to display in a cell.</field>
			/// <field name="titleFormat" type="String">Gets or sets the string used to format the header title.</field>
			/// <field name="titleSeparator" type="String">Gets or sets the string used as a title separator.</field>
			/// <field name="viewStyle" type="MindFusion.Scheduling.WeekRangeViewStyle">Gets or sets the style of the view.</field>
			/// <field name="visibleRows" type="MindFusion.Scheduling.Number">Gets or sets the number of rows visible at the same time.</field>
		},
		XmlPersistContext: function () {
			/// <summary>Provides methods that read/write schedule data to and from XML.</summary>
			/// <field name="document" type="Document">AGets a reference to the Document object containing XML-serialized schedule contents.</field>
			/// <field name="schedule" type="MindFusion.Scheduling.Schedule">Gets a reference to the Schedule object being serialized.</field>
		},
		__namespace: true
	},
	__namespace: true
};

MindFusion.Common.Collections.IEnumerable.prototype = {
	add: function(item) {
		/// <summary>Adds an object to the end of the collection.</summary>
		/// <param name="item" type="Object">Object. The object to add.</param>
	},
	addRange: function(range) {
		/// <summary>Adds a range of elements to the end of the collection.</summary>
		/// <param name="range" type="Array">Array. The range to add.</param>
	},
	clear: function() {
		/// <summary>Clears the collection.</summary>
	},
	clone: function() {
		/// <summary>Creates a copy of the collection.</summary>
		/// <returns type="IEnumerable">IEnumerable. A copy of this collection.</returns>
	},
	contains: function(item) {
		/// <summary>Checks if the given element is present in the collection.</summary>
		/// <param name="item" type="Object">Object. The object to check for.</param>
		/// <returns type="Boolean">Boolean. True if the element is found, otherwise false.</returns>
	},
	copyTo: function(destination, length, sourceIndex, destinationIndex) {
		/// <summary>Copies a range of elements from this collection to a destination collection.</summary>
		/// <param name="destination" type="IEnumerable">IEnumerable. The destination collection.</param>
		/// <param name="length" type="Number">Number. The length of the range to copy.</param>
		/// <param name="sourceIndex" type="Number" optional="true">Optional. Number. The starting index of the range to copy.</param>
		/// <param name="destinationIndex" type="Number" optional="true">Optional. Number. The index at which the range should be copied.</param>
	},
	count: function() {
		/// <summary>Gets the number of elements.</summary>
		/// <returns type="Number">Number. The number of elements.</returns>
	},
	first: function() {
		/// <summary>Returns the first element in the collection.</summary>
		/// <returns type="Object">Object. The first element in the collection.</returns>
	},
	forEach: function(callback, context) {
		/// <summary>Executes a provided function once for each element.</summary>
		/// <param name="callback" type="function">function. A function to execute for each element.</param>
		/// <param name="context" type="Object">Object. The invokation context.</param>
	},
	indexOfItem: function(obj, fromIndex) {
		/// <summary>Gets the index of a given object in a collection.</summary>
		/// <param name="obj" type="Object">Object. The object to look for.</param>
		/// <param name="fromIndex" type="Number" optional="true">Optional. Number. The starting index to search from.</param>
		/// <returns type="Number">Number. The index of the object, or -1 if the object is not present in the collection.</returns>
	},
	insert: function(index, item) {
		/// <summary>Adds an element to the collection at the specified index.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
		/// <param name="item" type="Object">Object. The object to add.</param>
	},
	item: function(index) {
		/// <summary>Gets the element at the given index.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
		/// <returns type="Object">Object. The element at the given index.</returns>
	},
	items: function() {
		/// <summary>Gets the collection as an array.</summary>
		/// <returns type="Array">Array. The underlying array data structure of the collection.</returns>
	},
	last: function() {
		/// <summary>Returns the last element in the collection.</summary>
		/// <returns type="Object">Object. The last element in the collection.</returns>
	},
	max: function(selector) {
		/// <summary>Invokes a transform function on each item and returns the maximum value in a sequence of numbers.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The maximum number in the sequence.</returns>
	},
	min: function(selector) {
		/// <summary>Invokes a transform function on each item and returns theminimum value in a sequence of numbers.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The minimum number in the sequence.</returns>
	},
	remove: function(item) {
		/// <summary>Removes an element from the collection.</summary>
		/// <param name="item" type="Object">Object. The object to remove.</param>
	},
	removeAt: function(index) {
		/// <summary>Removes the element at the given index.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
	},
	removeRange: function(index, count) {
		/// <summary>Removes a range of elements starting from the given index.</summary>
		/// <param name="index" type="Number">Number. The starting index of the range.</param>
		/// <param name="count" type="Number">Number. The length of the range.</param>
	},
	reverse: function() {
		/// <summary>Gets the collection as an array in reverse order.</summary>
		/// <returns type="Array">Array. The underlying array data structure of the collection in reverse order.</returns>
	},
	select: function(selector) {
		/// <summary>Projects each element of a sequence into a new form.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="IEnumerable">IEnumerable. An collection whose elements are the resultof invoking the transform function on each element.</returns>
	},
	sort: function(compareFn) {
		/// <summary>Sorts the underlying array.</summary>
		/// <param name="compareFn" type="function" optional="true">Optional. function. The comparing function.</param>
	},
	sum: function(selector) {
		/// <summary>Computes the sum of the sequence of number values that are obtained by invoking a transform function on each element.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The sum of the number values in the sequence.</returns>
	},
	toArray: function() {
		/// <summary>Returns a new Object array, containing the contents of the collection.</summary>
		/// <returns type="Array">Array. The array.</returns>
	},
	where: function(selector) {
		/// <summary>Filters a sequence of values based on a predicate.</summary>
		/// <param name="selector" type="function">function. A function to test each element for a condition.</param>
		/// <returns type="IEnumerable">IEnumerable. An collection that contains elements from the input sequence that satisfy the condition.</returns>
	}
};
MindFusion.Common.Collections.IEnumerable.__class = true;

MindFusion.Common.Collections.List.prototype = {
	add: function(item) {
		/// <summary>Adds an object to the end of the collection. Inherited from IEnumerable.</summary>
		/// <param name="item" type="Object">Object. The object to add.</param>
	},
	addRange: function(range) {
		/// <summary>Adds a range of elements to the end of the collection. Inherited from IEnumerable.</summary>
		/// <param name="range" type="Array">Array. The range to add.</param>
	},
	clear: function() {
		/// <summary>Clears the collection. Inherited from IEnumerable.</summary>
	},
	clone: function() {
		/// <summary>Creates a copy of the collection. Inherited from IEnumerable.</summary>
		/// <returns type="IEnumerable">IEnumerable. A copy of this collection.</returns>
	},
	contains: function(item) {
		/// <summary>Checks if the given element is present in the collection. Inherited from IEnumerable.</summary>
		/// <param name="item" type="Object">Object. The object to check for.</param>
		/// <returns type="Boolean">Boolean. True if the element is found, otherwise false.</returns>
	},
	copyTo: function(destination, length, sourceIndex, destinationIndex) {
		/// <summary>Copies a range of elements from this collection to a destination collection. Inherited from IEnumerable.</summary>
		/// <param name="destination" type="IEnumerable">IEnumerable. The destination collection.</param>
		/// <param name="length" type="Number">Number. The length of the range to copy.</param>
		/// <param name="sourceIndex" type="Number" optional="true">Optional. Number. The starting index of the range to copy.</param>
		/// <param name="destinationIndex" type="Number" optional="true">Optional. Number. The index at which the range should be copied.</param>
	},
	count: function() {
		/// <summary>Gets the number of elements. Inherited from IEnumerable.</summary>
		/// <returns type="Number">Number. The number of elements.</returns>
	},
	first: function() {
		/// <summary>Returns the first element in the collection. Inherited from IEnumerable.</summary>
		/// <returns type="Object">Object. The first element in the collection.</returns>
	},
	forEach: function(callback, context) {
		/// <summary>Executes a provided function once for each element. Inherited from IEnumerable.</summary>
		/// <param name="callback" type="function">function. A function to execute for each element.</param>
		/// <param name="context" type="Object">Object. The invokation context.</param>
	},
	indexOfItem: function(obj, fromIndex) {
		/// <summary>Gets the index of a given object in a collection. Inherited from IEnumerable.</summary>
		/// <param name="obj" type="Object">Object. The object to look for.</param>
		/// <param name="fromIndex" type="Number" optional="true">Optional. Number. The starting index to search from.</param>
		/// <returns type="Number">Number. The index of the object, or -1 if the object is not present in the collection.</returns>
	},
	insert: function(index, item) {
		/// <summary>Adds an element to the collection at the specified index. Inherited from IEnumerable.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
		/// <param name="item" type="Object">Object. The object to add.</param>
	},
	item: function(index) {
		/// <summary>Gets the element at the given index. Inherited from IEnumerable.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
		/// <returns type="Object">Object. The element at the given index.</returns>
	},
	items: function() {
		/// <summary>Gets the collection as an array. Inherited from IEnumerable.</summary>
		/// <returns type="Array">Array. The underlying array data structure of the collection.</returns>
	},
	last: function() {
		/// <summary>Returns the last element in the collection. Inherited from IEnumerable.</summary>
		/// <returns type="Object">Object. The last element in the collection.</returns>
	},
	max: function(selector) {
		/// <summary>Invokes a transform function on each item and returns the maximum value in a sequence of numbers. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The maximum number in the sequence.</returns>
	},
	min: function(selector) {
		/// <summary>Invokes a transform function on each item and returns theminimum value in a sequence of numbers. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The minimum number in the sequence.</returns>
	},
	remove: function(item) {
		/// <summary>Removes an element from the collection. Inherited from IEnumerable.</summary>
		/// <param name="item" type="Object">Object. The object to remove.</param>
	},
	removeAt: function(index) {
		/// <summary>Removes the element at the given index. Inherited from IEnumerable.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
	},
	removeRange: function(index, count) {
		/// <summary>Removes a range of elements starting from the given index. Inherited from IEnumerable.</summary>
		/// <param name="index" type="Number">Number. The starting index of the range.</param>
		/// <param name="count" type="Number">Number. The length of the range.</param>
	},
	reverse: function() {
		/// <summary>Gets the collection as an array in reverse order. Inherited from IEnumerable.</summary>
		/// <returns type="Array">Array. The underlying array data structure of the collection in reverse order.</returns>
	},
	select: function(selector) {
		/// <summary>Projects each element of a sequence into a new form. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="IEnumerable">IEnumerable. An collection whose elements are the resultof invoking the transform function on each element.</returns>
	},
	sort: function(compareFn) {
		/// <summary>Sorts the underlying array. Inherited from IEnumerable.</summary>
		/// <param name="compareFn" type="function" optional="true">Optional. function. The comparing function.</param>
	},
	sum: function(selector) {
		/// <summary>Computes the sum of the sequence of number values that are obtained by invoking a transform function on each element. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The sum of the number values in the sequence.</returns>
	},
	toArray: function() {
		/// <summary>Returns a new Object array, containing the contents of the collection. Inherited from IEnumerable.</summary>
		/// <returns type="Array">Array. The array.</returns>
	},
	where: function(selector) {
		/// <summary>Filters a sequence of values based on a predicate. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A function to test each element for a condition.</param>
		/// <returns type="IEnumerable">IEnumerable. An collection that contains elements from the input sequence that satisfy the condition.</returns>
	}
};
MindFusion.Common.Collections.List.__class = true;

MindFusion.Common.Collections.ObservableCollection.prototype = {
	add: function(item) {
		/// <summary>Adds an item to the collection.</summary>
		/// <param name="item" type="Object">Object. The item to add.</param>
	},
	clear: function() {
		/// <summary>Clears the collection.</summary>
	},
	insert: function(index, item) {
		/// <summary>Adds an item to the collection at the specified index.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
		/// <param name="item" type="Object">Object. The object to add.</param>
	},
	remove: function(item) {
		/// <summary>Deletes an item from the collection.</summary>
		/// <param name="item" type="Object">Object. The item to remove.</param>
	},
	removeAt: function(itemIndex) {
		/// <summary>Deletes the item at the specified index.</summary>
		/// <param name="itemIndex" type="Number">Number. The index to remove at.</param>
	},
	removeRange: function(index, count) {
		/// <summary>Deletes a range of items from the collection.</summary>
		/// <param name="index" type="Number">Number. The starting index of the range to remove.</param>
		/// <param name="count" type="Number">Number. The length of the range to remove.</param>
	},
	addRange: function(range) {
		/// <summary>Adds a range of elements to the end of the collection. Inherited from IEnumerable.</summary>
		/// <param name="range" type="Array">Array. The range to add.</param>
	},
	clone: function() {
		/// <summary>Creates a copy of the collection. Inherited from IEnumerable.</summary>
		/// <returns type="IEnumerable">IEnumerable. A copy of this collection.</returns>
	},
	contains: function(item) {
		/// <summary>Checks if the given element is present in the collection. Inherited from IEnumerable.</summary>
		/// <param name="item" type="Object">Object. The object to check for.</param>
		/// <returns type="Boolean">Boolean. True if the element is found, otherwise false.</returns>
	},
	copyTo: function(destination, length, sourceIndex, destinationIndex) {
		/// <summary>Copies a range of elements from this collection to a destination collection. Inherited from IEnumerable.</summary>
		/// <param name="destination" type="IEnumerable">IEnumerable. The destination collection.</param>
		/// <param name="length" type="Number">Number. The length of the range to copy.</param>
		/// <param name="sourceIndex" type="Number" optional="true">Optional. Number. The starting index of the range to copy.</param>
		/// <param name="destinationIndex" type="Number" optional="true">Optional. Number. The index at which the range should be copied.</param>
	},
	count: function() {
		/// <summary>Gets the number of elements. Inherited from IEnumerable.</summary>
		/// <returns type="Number">Number. The number of elements.</returns>
	},
	first: function() {
		/// <summary>Returns the first element in the collection. Inherited from IEnumerable.</summary>
		/// <returns type="Object">Object. The first element in the collection.</returns>
	},
	forEach: function(callback, context) {
		/// <summary>Executes a provided function once for each element. Inherited from IEnumerable.</summary>
		/// <param name="callback" type="function">function. A function to execute for each element.</param>
		/// <param name="context" type="Object">Object. The invokation context.</param>
	},
	indexOfItem: function(obj, fromIndex) {
		/// <summary>Gets the index of a given object in a collection. Inherited from IEnumerable.</summary>
		/// <param name="obj" type="Object">Object. The object to look for.</param>
		/// <param name="fromIndex" type="Number" optional="true">Optional. Number. The starting index to search from.</param>
		/// <returns type="Number">Number. The index of the object, or -1 if the object is not present in the collection.</returns>
	},
	item: function(index) {
		/// <summary>Gets the element at the given index. Inherited from IEnumerable.</summary>
		/// <param name="index" type="Number">Number. The index.</param>
		/// <returns type="Object">Object. The element at the given index.</returns>
	},
	items: function() {
		/// <summary>Gets the collection as an array. Inherited from IEnumerable.</summary>
		/// <returns type="Array">Array. The underlying array data structure of the collection.</returns>
	},
	last: function() {
		/// <summary>Returns the last element in the collection. Inherited from IEnumerable.</summary>
		/// <returns type="Object">Object. The last element in the collection.</returns>
	},
	max: function(selector) {
		/// <summary>Invokes a transform function on each item and returns the maximum value in a sequence of numbers. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The maximum number in the sequence.</returns>
	},
	min: function(selector) {
		/// <summary>Invokes a transform function on each item and returns theminimum value in a sequence of numbers. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The minimum number in the sequence.</returns>
	},
	reverse: function() {
		/// <summary>Gets the collection as an array in reverse order. Inherited from IEnumerable.</summary>
		/// <returns type="Array">Array. The underlying array data structure of the collection in reverse order.</returns>
	},
	select: function(selector) {
		/// <summary>Projects each element of a sequence into a new form. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="IEnumerable">IEnumerable. An collection whose elements are the resultof invoking the transform function on each element.</returns>
	},
	sort: function(compareFn) {
		/// <summary>Sorts the underlying array. Inherited from IEnumerable.</summary>
		/// <param name="compareFn" type="function" optional="true">Optional. function. The comparing function.</param>
	},
	sum: function(selector) {
		/// <summary>Computes the sum of the sequence of number values that are obtained by invoking a transform function on each element. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A transform function to invoke on each element.</param>
		/// <returns type="Number">Number. The sum of the number values in the sequence.</returns>
	},
	toArray: function() {
		/// <summary>Returns a new Object array, containing the contents of the collection. Inherited from IEnumerable.</summary>
		/// <returns type="Array">Array. The array.</returns>
	},
	where: function(selector) {
		/// <summary>Filters a sequence of values based on a predicate. Inherited from IEnumerable.</summary>
		/// <param name="selector" type="function">function. A function to test each element for a condition.</param>
		/// <returns type="IEnumerable">IEnumerable. An collection that contains elements from the input sequence that satisfy the condition.</returns>
	}
};
MindFusion.Common.Collections.ObservableCollection.__class = true;

MindFusion.Common.Control.prototype = {
	attach: function() {
		/// <summary>Attach control event handlers.</summary>
	},
	detach: function() {
		/// <summary>Detach control event handlers.</summary>
	},
	dispose: function() {
		/// <summary>Dispose the control.</summary>
	},
	draw: function() {
		/// <summary>Draws the control.</summary>
		/// <returns type="HTMLElement">HTMLElement. The control DOM element.</returns>
	},
	render: function() {
		/// <summary>Draws the control and prepares it for user interaction.</summary>
	}
};
MindFusion.Common.Control.__class = true;

MindFusion.Common.Control.find = function(id) {
	/// <summary>Returns the control with the specified ID.</summary>
	/// <param name="id" type="String">String. The ID.</param>
	/// <returns type="Control">Control. The control with the specified ID, if found; otherwise, null.</returns>
};

MindFusion.Common.DateFormats.prototype = {
};
MindFusion.Common.DateFormats.__class = true;

MindFusion.Common.DateSettings.prototype = {
	fromJson: function(json) {
		/// <summary>Deserializes the settings from a JSON string.</summary>
		/// <param name="json" type="String">String. A string containing data for the settings.</param>
	}
};
MindFusion.Common.DateSettings.__class = true;

MindFusion.Common.EventDispatcher.prototype = {
	addEventListener: function(handler) {
		/// <summary>Subcribes an event listener to this event.</summary>
		/// <param name="handler" type="function">function. The handler function.</param>
	},
	raiseEvent: function(sender, args) {
		/// <summary>Raises this event.</summary>
		/// <param name="sender" type="Object">Object. The source of the event.</param>
		/// <param name="args" type="Object">Object. An object, containing event data.</param>
	},
	removeEventListener: function(handler) {
		/// <summary>Removes an event listener from this event.</summary>
		/// <param name="handler" type="function">function. The handler function.</param>
	}
};
MindFusion.Common.EventDispatcher.__class = true;

MindFusion.Common.IdGenerator.prototype = {
};
MindFusion.Common.IdGenerator.__class = true;

MindFusion.Common.IdGenerator.generate = function(prefix) {
	/// <summary>Generates a new id that starts with the specified prefix.</summary>
	/// <param name="prefix" type="String">String. A prefix to insert at the beginning of the identifier.</param>
	/// <returns type="String">String. A string containing the generated identifier.</returns>
};

MindFusion.Common.Locale.prototype = {
	fromJson: function(dateSettingsJson) {
		/// <summary>Deserializes the locale from a JSON string.</summary>
		/// <param name="dateSettingsJson" type="String">String. A string containing data for the date settings.</param>
	}
};
MindFusion.Common.Locale.__class = true;

MindFusion.Common.Locale.default = function() {
	/// <summary>Returns a default Locale object.</summary>
	/// <returns type="Locale">Locale. A locale object with default settings.</returns>
};

MindFusion.Common.NotifyCollectionChangedAction.prototype = {
};
MindFusion.Common.NotifyCollectionChangedAction.__class = true;

MindFusion.Common.NotifyCollectionChangedEventArgs.prototype = {
};
MindFusion.Common.NotifyCollectionChangedEventArgs.__class = true;

MindFusion.Common.NotifyCollectionChangingEventArgs.prototype = {
};
MindFusion.Common.NotifyCollectionChangingEventArgs.__class = true;

MindFusion.Common.PropertyEventArgs.prototype = {
};
MindFusion.Common.PropertyEventArgs.__class = true;

MindFusion.Common.UIControl.prototype = {
	draw: function() {
		/// <summary>Draws the UIControl.</summary>
		/// <returns type="HTMLElement">HTMLElement. The control DOM element.</returns>
	}
};
MindFusion.Common.UIControl.__class = true;

MindFusion.Common.Unit.prototype = {
	toString: function() {
		/// <summary>Returns a string representation of this Unit.</summary>
		/// <returns type="String">String. The string representation.</returns>
	}
};
MindFusion.Common.Unit.__class = true;

MindFusion.Common.Unit.empty = function() {
	/// <summary>Creates an empty Unit instance.</summary>
	/// <returns type="Unit">Unit. The new Unit.</returns>
};
MindFusion.Common.Unit.parse = function(value) {
	/// <summary>Creates a Unit instance from a string representation.</summary>
	/// <param name="value" type="String">String. The string representation of the unit.</param>
	/// <returns type="Unit">Unit. The new Unit, or null if the string is invalid.</returns>
};
MindFusion.Common.Unit.percentage = function(value) {
	/// <summary>Creates a Unit instance with the specified value and UnitType.Percent.</summary>
	/// <param name="value" type="Number">Number. The value of the unit.</param>
	/// <returns type="Unit">Unit. The new Unit.</returns>
};
MindFusion.Common.Unit.pixel = function(value) {
	/// <summary>Creates a Unit instance with the specified value and UnitType.Pixel.</summary>
	/// <param name="value" type="Number">Number. The value of the unit.</param>
	/// <returns type="Unit">Unit. The new Unit.</returns>
};

MindFusion.Common.UnitType = {
		/// <summary>Specifies a unit of measurement.</summary>
		/// <field name="Percent">The measurement is a percentage relative to the parent element.</field>
		/// <field name="Pixel">The measurement is in pixels.</field>
	Percent: 2,
	Pixel: 1
}
MindFusion.Common.UnitType.__enum = true;

MindFusion.Controls.Alignment = {
		/// <summary>Specifies the alignment of text relative to its layout rectangle.</summary>
		/// <field name="Center">The text is drawn in the center of the layout rectangle.</field>
		/// <field name="Far">The text is drawn in the far corner of the layout rectangle.</field>
		/// <field name="Near">The text is drawn in the near corner of the layout rectangle.</field>
	Center: 1,
	Far: 2,
	Near: 0
}
MindFusion.Controls.Alignment.__enum = true;

MindFusion.Controls.CancelEventArgs.prototype = {
};
MindFusion.Controls.CancelEventArgs.__class = true;

MindFusion.Controls.Canvas.prototype = {
	dispose: function() {
		/// <summary>Overrides Disposable.dispose</summary>
	},
	invalidate: function(rect, force) {
		/// <summary>Invalidates the canvas or a region of the canvas, causing it to be repainted.</summary>
		/// <param name="rect" type="Rect" optional="true">Optional. Rect. A Rect instance specifying the region that should be repainted. If not specified, the whole diagram will be repainted.</param>
		/// <param name="force" type="Boolean" optional="true">Optional. Boolean. true to force redraw even if currently painting, or false otherwise.</param>
	},
	repaint: function(printOptions) {
		/// <summary>Repaints the canvas.</summary>
		/// <param name="printOptions" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	addEventListener: function(eventName, handler, element) {
		/// <summary>Registers a single event listener on the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that will handle the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	raiseEvent: function(eventName, args, element) {
		/// <summary>Raises an event. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event to raise.</param>
		/// <param name="args" type="EventArgs">EventArgs. An instance of type EventArgs that holds data for the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	removeEventListener: function(eventName, handler, element) {
		/// <summary>Removes a single event listener attached to the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that handles the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	}
};
MindFusion.Controls.Canvas.__class = true;

MindFusion.Controls.CanvasControl.prototype = {
	clientToDoc: function(point) {
		/// <summary>Transforms a point from client to document coordinates.</summary>
		/// <param name="point" type="Point">Point. The point to transform.</param>
		/// <returns type="Point">Point. The transformed point.</returns>
	},
	docToClient: function(point) {
		/// <summary>Transforms a point from document to client coordinates.</summary>
		/// <param name="point" type="Point">Point. The point to transform.</param>
		/// <returns type="Point">Point. The transformed point.</returns>
	},
	addEventListener: function(eventName, handler, element) {
		/// <summary>Registers a single event listener on the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that will handle the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	raiseEvent: function(eventName, args, element) {
		/// <summary>Raises an event. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event to raise.</param>
		/// <param name="args" type="EventArgs">EventArgs. An instance of type EventArgs that holds data for the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	removeEventListener: function(eventName, handler, element) {
		/// <summary>Removes a single event listener attached to the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that handles the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	registerForSubmit: function(id) {
		/// <summary>Registers an onsubmit handler for the Control's parent html form to flush postback data. Inherited from Control.</summary>
		/// <param name="id" type="String">String. The id of the hidden field to flush the data to.</param>
	},
	attach: function() {
		/// <summary>Attach control event handlers. Inherited from Control.</summary>
	},
	detach: function() {
		/// <summary>Detach control event handlers. Inherited from Control.</summary>
	},
	dispose: function() {
		/// <summary>Dispose the control. Inherited from Control.</summary>
	},
	draw: function() {
		/// <summary>Draws the control. Inherited from Control.</summary>
		/// <returns type="HTMLElement">HTMLElement. The control DOM element.</returns>
	},
	render: function() {
		/// <summary>Draws the control and prepares it for user interaction. Inherited from Control.</summary>
	}
};
MindFusion.Controls.CanvasControl.__class = true;

MindFusion.Controls.CanvasControl.addHandlers = function() {
	/// <summary>Adds an event listener to a DOM element. Inherited from Control.</summary>
};
MindFusion.Controls.CanvasControl.clearHandlers = function() {
	/// <summary>Removes all event listeners from a DOM element. Inherited from Control.</summary>
};
MindFusion.Controls.CanvasControl.fromJson = function() {
	/// <summary>Constructs a JavaScript object from a JSON string. Inherited from Control.</summary>
	/// <returns type="Object">Object. object The corresponding to the given JSON text.</returns>
};
MindFusion.Controls.CanvasControl.toJson = function(object) {
	/// <summary>Converts a JavaScript object to a JSON string. Inherited from Control.</summary>
	/// <param name="object" type="Object">Object. The object to stringify.</param>
	/// <returns type="String">String. The JSON string.</returns>
};
MindFusion.Controls.CanvasControl.find = function(id) {
	/// <summary>Returns the control with the specified ID. Inherited from Control.</summary>
	/// <param name="id" type="String">String. The ID.</param>
	/// <returns type="Control">Control. The control with the specified ID, if found; otherwise, null.</returns>
};

MindFusion.Controls.Control.prototype = {
	registerForSubmit: function(id) {
		/// <summary>Registers an onsubmit handler for the Control's parent html form to flush postback data.</summary>
		/// <param name="id" type="String">String. The id of the hidden field to flush the data to.</param>
	},
	addEventListener: function(eventName, handler, element) {
		/// <summary>Registers a single event listener on the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that will handle the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	raiseEvent: function(eventName, args, element) {
		/// <summary>Raises an event. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event to raise.</param>
		/// <param name="args" type="EventArgs">EventArgs. An instance of type EventArgs that holds data for the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	removeEventListener: function(eventName, handler, element) {
		/// <summary>Removes a single event listener attached to the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that handles the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	}
};
MindFusion.Controls.Control.__class = true;

MindFusion.Controls.Control.addHandlers = function() {
	/// <summary>Adds an event listener to a DOM element.</summary>
};
MindFusion.Controls.Control.clearHandlers = function() {
	/// <summary>Removes all event listeners from a DOM element.</summary>
};
MindFusion.Controls.Control.fromJson = function() {
	/// <summary>Constructs a JavaScript object from a JSON string.</summary>
	/// <returns type="Object">Object. object The corresponding to the given JSON text.</returns>
};
MindFusion.Controls.Control.toJson = function(object) {
	/// <summary>Converts a JavaScript object to a JSON string.</summary>
	/// <param name="object" type="Object">Object. The object to stringify.</param>
	/// <returns type="String">String. The JSON string.</returns>
};

MindFusion.Controls.Disposable.prototype = {
	addEventListener: function(eventName, handler, element) {
		/// <summary>Registers a single event listener on the instance.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that will handle the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	raiseEvent: function(eventName, args, element) {
		/// <summary>Raises an event.</summary>
		/// <param name="eventName" type="String">String. The name of the event to raise.</param>
		/// <param name="args" type="EventArgs">EventArgs. An instance of type EventArgs that holds data for the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	removeEventListener: function(eventName, handler, element) {
		/// <summary>Removes a single event listener attached to the instance.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that handles the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	}
};
MindFusion.Controls.Disposable.__class = true;

MindFusion.Controls.DomUtils.prototype = {
};
MindFusion.Controls.DomUtils.__class = true;

MindFusion.Controls.DomUtils.formatString = function() {
	/// <summary>Formats the specified string according to the specified parameters.</summary>
};
MindFusion.Controls.DomUtils.getBounds = function(element, parent, includeScroll) {
	/// <summary>Gets the bounds of the specified element.</summary>
	/// <param name="element" type="HTMLElement">HTMLElement. The element to check.</param>
	/// <param name="parent" type="HTMLElement" optional="true">Optional. HTMLElement. The parent of the element. If supplied, the returned bounds will be relative to the parent element bounds.</param>
	/// <param name="includeScroll" type="Boolean" optional="true">Optional. Boolean. For internal use.</param>
	/// <returns type="Rect">Rect. The bounding rectangle.</returns>
};
MindFusion.Controls.DomUtils.getElementAttributes = function() {
	/// <summary>Gets an object containing element attributes that have values.</summary>
};
MindFusion.Controls.DomUtils.HTMLtoXHTML = function(html) {
	/// <summary>Converts HTML to XHMTL.</summary>
	/// <param name="html" type="String">String. The HTML to convert.</param>
	/// <returns type="String">String. The resulting XHTML.</returns>
};
MindFusion.Controls.DomUtils.loadImageList = function(images) {
	/// <summary>Loads the images from the specified list of image url-s.</summary>
	/// <param name="images" type="Array">Array. An array of image url-s.</param>
	/// <returns type="Promise">Promise. Promise object contaning an array of images in base64 format.</returns>
};
MindFusion.Controls.DomUtils.setBounds = function(element, bounds) {
	/// <summary>Sets the bounds of the specified element.</summary>
	/// <param name="element" type="HTMLElement">HTMLElement. The element.</param>
	/// <param name="bounds" type="Rect">Rect. The bounding rectangle.</param>
};
MindFusion.Controls.DomUtils.setSize = function(element, size) {
	/// <summary>Sets the size of the specified element.</summary>
	/// <param name="element" type="HTMLElement">HTMLElement. The element.</param>
	/// <param name="size" type="Size">Size. The new size.</param>
};
MindFusion.Controls.DomUtils.toDataUrl = function(url, callback) {
	/// <summary>Converts an image to base64 string.</summary>
	/// <param name="url" type="String">String. The url of the image.</param>
	/// <param name="callback" type="function">function. The callback function.</param>
	/// <returns type="String">String. The base64-encoded string, representing the image.</returns>
};

MindFusion.Controls.EventArgs.prototype = {
};
MindFusion.Controls.EventArgs.__class = true;

MindFusion.Controls.Events.prototype = {
};
MindFusion.Controls.Events.__class = true;

MindFusion.Controls.MouseButton = {
		/// <summary>Specifies which button was pressed to trigger the event.</summary>
		/// <field name="Auxiliary">Auxiliary button pressed, usually the wheel button or the middle button.</field>
		/// <field name="Fifth">Fifth button, typically the Browser Forward button.</field>
		/// <field name="Fourth">Fourth button, typically the Browser Back button.</field>
		/// <field name="Main">Main button pressed, usually the left button or the un-initialized state.</field>
		/// <field name="Secondary">Secondary button pressed, usually the right button.</field>
	Auxiliary: 1,
	Fifth: 4,
	Fourth: 3,
	Main: 0,
	Secondary: 2
}
MindFusion.Controls.MouseButton.__enum = true;

MindFusion.Controls.MouseCursors = {
		/// <summary>Specifies the type of the mouse cursor.</summary>
}
MindFusion.Controls.MouseCursors.__enum = true;

MindFusion.Controls.TickPosition = {
		/// <summary>Specifies the position of trackbar ticks.</summary>
		/// <field name="Both">Ticks are rendered on both sides of the trackbar.</field>
		/// <field name="Left">Ticks are rendered on the left side of the trackbar.</field>
		/// <field name="None">There are no ticks rendered.</field>
		/// <field name="Right">Ticks are rendered on the right side of the trackbar.</field>
	Both: 3,
	Left: 1,
	None: 0,
	Right: 2
}
MindFusion.Controls.TickPosition.__enum = true;

MindFusion.Controls.ZoomControl.prototype = {
	addEventListener: function(eventName, handler, element) {
		/// <summary>Registers a single event listener on the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that will handle the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	raiseEvent: function(eventName, args, element) {
		/// <summary>Raises an event. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event to raise.</param>
		/// <param name="args" type="EventArgs">EventArgs. An instance of type EventArgs that holds data for the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	removeEventListener: function(eventName, handler, element) {
		/// <summary>Removes a single event listener attached to the instance. Inherited from Disposable.</summary>
		/// <param name="eventName" type="String">String. The name of the event.</param>
		/// <param name="handler" type="Method">Method. Represents the method that handles the event specified with eventName.</param>
		/// <param name="element" type="Object" optional="true">Optional. Object. For internal use.</param>
	},
	registerForSubmit: function(id) {
		/// <summary>Registers an onsubmit handler for the Control's parent html form to flush postback data. Inherited from Control.</summary>
		/// <param name="id" type="String">String. The id of the hidden field to flush the data to.</param>
	},
	attach: function() {
		/// <summary>Attach control event handlers. Inherited from Control.</summary>
	},
	detach: function() {
		/// <summary>Detach control event handlers. Inherited from Control.</summary>
	},
	dispose: function() {
		/// <summary>Dispose the control. Inherited from Control.</summary>
	},
	draw: function() {
		/// <summary>Draws the control. Inherited from Control.</summary>
		/// <returns type="HTMLElement">HTMLElement. The control DOM element.</returns>
	},
	render: function() {
		/// <summary>Draws the control and prepares it for user interaction. Inherited from Control.</summary>
	},
	clientToDoc: function(point) {
		/// <summary>Transforms a point from client to document coordinates. Inherited from CanvasControl.</summary>
		/// <param name="point" type="Point">Point. The point to transform.</param>
		/// <returns type="Point">Point. The transformed point.</returns>
	},
	docToClient: function(point) {
		/// <summary>Transforms a point from document to client coordinates. Inherited from CanvasControl.</summary>
		/// <param name="point" type="Point">Point. The point to transform.</param>
		/// <returns type="Point">Point. The transformed point.</returns>
	}
};
MindFusion.Controls.ZoomControl.__class = true;

MindFusion.Controls.ZoomControl.create = function(element) {
	/// <summary>Creates and initializes a new ZoomControl from the specified element. This method is static and can be called without creating an instance of the class.</summary>
	/// <param name="element" type="HTMLCanvasElement">HTMLCanvasElement. The DOM element that the zoomControl should be attached to.</param>
	/// <returns type="ZoomControl">A ZoomControl object that represents the newly created zoom control.</returns>
};
MindFusion.Controls.ZoomControl.find = function(id) {
	/// <summary>Returns the specified ZoomControl object. This member is static and can be invoked without creating an instance of the class.</summary>
	/// <param name="id" type="String">String. The id of the ZoomControl's DOM element.</param>
	/// <returns type="ZoomControl">A ZoomControl object with the specified id, if found, or&#160;null otherwise.</returns>
};
MindFusion.Controls.ZoomControl.addHandlers = function() {
	/// <summary>Adds an event listener to a DOM element. Inherited from Control.</summary>
};
MindFusion.Controls.ZoomControl.clearHandlers = function() {
	/// <summary>Removes all event listeners from a DOM element. Inherited from Control.</summary>
};
MindFusion.Controls.ZoomControl.fromJson = function() {
	/// <summary>Constructs a JavaScript object from a JSON string. Inherited from Control.</summary>
	/// <returns type="Object">Object. object The corresponding to the given JSON text.</returns>
};
MindFusion.Controls.ZoomControl.toJson = function(object) {
	/// <summary>Converts a JavaScript object to a JSON string. Inherited from Control.</summary>
	/// <param name="object" type="Object">Object. The object to stringify.</param>
	/// <returns type="String">String. The JSON string.</returns>
};

MindFusion.Scheduling.BaseForm.prototype = {
	addControl: function(control) {
		/// <summary>Adds the specified control to the collection of controls.</summary>
		/// <param name="control" type="Object">Object. The control to add.</param>
	},
	clearControls: function() {
		/// <summary>Clears all items from the collection of controls.</summary>
	},
	closeForm: function(formId) {
		/// <summary>Closes the form.</summary>
		/// <param name="formId" type="String" optional="true">Optional. String. The Id of the form to be closed.</param>
	},
	col: function() {
		/// <summary>Renders a column element.</summary>
	},
	createButton: function(options) {
		/// <summary>Creates a button with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created button.</returns>
	},
	createCheckBox: function(options) {
		/// <summary>Creates a check-box with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created check-box</returns>
	},
	createCheckBoxList: function(options) {
		/// <summary>Creates a check box list with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created check-box list.</returns>
	},
	createDropDownList: function(options) {
		/// <summary>Creates a drop-down list with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created drop-down list.</returns>
	},
	createEditBox: function(options) {
		/// <summary>Creates an edit box with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created edit box.</returns>
	},
	createRadioButton: function(options) {
		/// <summary>Creates a radio button with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created radio button.</returns>
	},
	createTextArea: function(options) {
		/// <summary>Creates a text area with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created text area.</returns>
	},
	createTextBox: function(options) {
		/// <summary>Creates a text box with the specified options.</summary>
		/// <param name="options" type="Object">Object. Object, containing data for the new control.</param>
		/// <returns type="Object">Object. The newly created text box.</returns>
	},
	divider: function() {
		/// <summary>Renders a horizontal line divider.</summary>
	},
	drawButtons: function() {
		/// <summary>Renders the form buttons.</summary>
	},
	drawContent: function() {
		/// <summary>Renders the form content.</summary>
	},
	drawHeader: function() {
		/// <summary>Renders the form header.</summary>
	},
	getControlValue: function(controlId) {
		/// <summary>Gets the value of the control with the specified id.</summary>
		/// <param name="controlId" type="String">String. The id of the control to check.</param>
		/// <returns type="Object">Object. The value of the control.</returns>
	},
	removeControl: function(control) {
		/// <summary>Removes the specified control from the collection of controls.</summary>
		/// <param name="control" type="Object">Object. The control to remove.</param>
	},
	row: function() {
		/// <summary>Renders a row element.</summary>
	},
	showForm: function() {
		/// <summary>Renders the form.</summary>
	}
};
MindFusion.Scheduling.BaseForm.__class = true;

MindFusion.Scheduling.ButtonEventArgs.prototype = {
};
MindFusion.Scheduling.ButtonEventArgs.__class = true;

MindFusion.Scheduling.Calendar.prototype = {
	adjust: function() {
		/// <summary>Recalculates calendar's dimensions.</summary>
	},
	attach: function() {
		/// <summary>Prepares the calendar for user interaction.</summary>
	},
	copyFrom: function(settings) {
		/// <summary>Copies property values for this Calendar from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	},
	detach: function() {
		/// <summary>Detaches calendar event handlers.</summary>
	},
	draw: function() {
		/// <summary>Control.draw override.</summary>
	},
	getCellAt: function(x, y) {
		/// <summary>Gets the calendar view cell that contains the specified coordinates.</summary>
		/// <param name="x" type="Number">Number. The X-coordinate of the point.</param>
		/// <param name="y" type="Number">Number. The Y-coordinate of the point.</param>
		/// <returns type="ViewCell">ViewCell. The calendar view cell that contains the specified coordinates or null if there is no cell at point.</returns>
	},
	getCellItems: function(cell) {
		/// <summary>Gets the items, whose visual elements are contained in the specified calendar cell.</summary>
		/// <param name="cell" type="ViewCell">ViewCell. The cell to check.</param>
		/// <returns type="Array">Array. An array of Item objects whose visual elements are contained in the specified calendar cell.</returns>
	},
	getItemCells: function(item) {
		/// <summary>Gets the calendar view cells that hold the specified item's visual elements.</summary>
		/// <param name="item" type="Item">Item. The item.</param>
		/// <returns type="Array">Array. An array of ViewCell objects that hold the specified item's visual elements.</returns>
	},
	getItemDom: function(item) {
		/// <summary>Gets the specified item's visual elements.</summary>
		/// <param name="item" type="Item">Item. The item.</param>
		/// <returns type="Array">Array. An array of div objects that represent the specified item's visual elements.</returns>
	},
	getTimeCell: function(time, isEndTime, resource) {
		/// <summary>Gets the calendar view cell that corresponds to the specified DateTime and resource.</summary>
		/// <param name="time" type="DateTime">DateTime. The time to search for.</param>
		/// <param name="isEndTime" type="Boolean" optional="true">Optional. Boolean. true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;false if the index of the second interval is contained. The default is false.</param>
		/// <param name="resource" type="Resource" optional="true">Optional. Resource. The resource to search for.</param>
		/// <returns type="ViewCell">ViewCell. The cell that corresponds the specified DateTime and resource.</returns>
	},
	getTimeCells: function(startTime, endTime, isEndTime, resource) {
		/// <summary>Gets the calendar view cells that corresponds to the specified DateTime range and the specified Resource.</summary>
		/// <param name="startTime" type="DateTime">DateTime. The start time of the range.</param>
		/// <param name="endTime" type="DateTime" optional="true">Optional. DateTime. The end time of the range.</param>
		/// <param name="isEndTime" type="Boolean" optional="true">Optional. Boolean. true if the index of the first interval is returned when the time is the boundary between two consecutive intervals;false if the index of the second interval is contained. The default is false.</param>
		/// <param name="resource" type="Resource" optional="true">Optional. Resource. The resource to search for.</param>
		/// <returns type="Array">An array of ViewCell objects that correspond to the specified DateTime range and Resource.</returns>
	},
	hasItemsToRemind: function() {
		/// <summary>Checks if there are Item-s which reminder has not come yet.</summary>
		/// <returns type="Boolean">true if there are items with a future reminder; otherwise false.</returns>
	},
	hasTasksToRemind: function() {
		/// <summary>Checks if there are Task-s which reminder has not come yet.</summary>
		/// <returns type="Boolean">true if there are tasks with a future reminder; otherwise false.</returns>
	},
	render: function() {
		/// <summary>Control.render override.</summary>
	},
	repaint: function(full) {
		/// <summary>Repaints the calendar contents.</summary>
		/// <param name="full" type="Boolean" optional="true">Optional. Boolean. True to recreate calendar items, otherwise false.</param>
	}
};
MindFusion.Scheduling.Calendar.__class = true;

MindFusion.Scheduling.CalendarView = {
		/// <summary>Specifies the type of view to display in a calendar control.</summary>
		/// <field name="List">The calendar displays several seconds, minutes, hours, days, weeks, months or years in a row.</field>
		/// <field name="MonthRange">The calendar displays several months in a grid. The days of each month are visible too.</field>
		/// <field name="ResourceView">The calendar displays the distribution of resources over a period of time.</field>
		/// <field name="SingleMonth">The calendar displays a single month at a time. The days of the month are displayed in a grid.</field>
		/// <field name="Timetable">The calendar displays a timetable where each row represents a fixed arbitrary time interval and each column represents a day.</field>
		/// <field name="WeekRange">The calendar displays a grid of days, with the columns representing the week days from Monday to Sunday and the rows representing weeks.</field>
	List: 3,
	MonthRange: 0,
	ResourceView: 5,
	SingleMonth: 1,
	Timetable: 4,
	WeekRange: 2
}
MindFusion.Scheduling.CalendarView.__enum = true;

MindFusion.Scheduling.CellEventArgs.prototype = {
};
MindFusion.Scheduling.CellEventArgs.__class = true;

MindFusion.Scheduling.Contact.prototype = {
	fromJson: function(json) {
		/// <summary>Deserializes this contact from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromJson: function(json, context) {
		/// <summary>Deserializes this Contact from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
	},
	loadFromXml: function(element, context) {
		/// <summary>Loads the contact content from an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that contains the contact's serialized content.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	saveToXml: function(element, context) {
		/// <summary>Saves the contact content into an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that will contain the contact's data.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	toJson: function(context) {
		/// <summary>Serializes this Contact into a JSON string.</summary>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
		/// <returns type="String">String. A string containing the contact's JSON representation.</returns>
	}
};
MindFusion.Scheduling.Contact.__class = true;

MindFusion.Scheduling.DailyRecurrence = {
		/// <summary>Specifies daily recurrence patterns.</summary>
		/// <field name="ByDayInterval">Repeats the item at regular intervals specified in the Recurrence.Days property.</field>
		/// <field name="EveryWeekend">Repeats the item each Saturday and Sunday.</field>
		/// <field name="EveryWorkday">Repeats the item each workday, Monday through Friday.</field>
	ByDayInterval: 0,
	EveryWeekend: 2,
	EveryWorkday: 1
}
MindFusion.Scheduling.DailyRecurrence.__enum = true;

MindFusion.Scheduling.DateChangedEventArgs.prototype = {
};
MindFusion.Scheduling.DateChangedEventArgs.__class = true;

MindFusion.Scheduling.DateTime.prototype = {
	__getDate: function() {
		/// <summary>Gets the day component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The day of month (1-31).</returns>
	},
	__getDay: function() {
		/// <summary>Gets the day of the week component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The day of the week (0-6). 0 is Sunday, 1 is Monday, etc.</returns>
	},
	__getFullYear: function() {
		/// <summary>Gets the year component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The year (four digits).</returns>
	},
	__getHours: function() {
		/// <summary>Gets the hours component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The hours (0-23).</returns>
	},
	__getMilliseconds: function() {
		/// <summary>Gets the milliseconds component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The milliseconds (0-999).</returns>
	},
	__getMinutes: function() {
		/// <summary>Gets the minutes component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The minutes (0-59).</returns>
	},
	__getMonth: function() {
		/// <summary>Gets the month component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The month (0-11). 0 is January, 1 is February, etc.</returns>
	},
	__getSeconds: function() {
		/// <summary>Gets the seconds component of this DateTime instance.</summary>
		/// <returns type="Number">Number. The seconds (0-59).</returns>
	},
	__getTime: function() {
		/// <summary>Gets the number of milliseconds between Jan 1 1970 00:00:00 and this DateTime instance.</summary>
		/// <returns type="Number">Number. The number of milliseconds since Jan 1 1970 00:00:00.</returns>
	},
	__getTimezoneOffset: function() {
		/// <summary>Gets the difference between GMT and local time in minutes.</summary>
		/// <returns type="Number">Number. The difference between GMT and local time in minutes.</returns>
	},
	__getUTCDate: function() {
		/// <summary>Gets the day component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The day of month (1-31).</returns>
	},
	__getUTCDay: function() {
		/// <summary>Gets the day of the week component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The day of the week (0-6). 0 is Sunday, 1 is Monday, etc.</returns>
	},
	__getUTCFullYear: function() {
		/// <summary>Gets the year component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The year (four digits).</returns>
	},
	__getUTCHours: function() {
		/// <summary>Gets the hours component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The hours (0-23).</returns>
	},
	__getUTCMilliseconds: function() {
		/// <summary>Gets the milliseconds component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The milliseconds (0-999).</returns>
	},
	__getUTCMinutes: function() {
		/// <summary>Gets the minutes component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The minutes (0-59).</returns>
	},
	__getUTCMonth: function() {
		/// <summary>Gets the month component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The month (0-11). 0 is January, 1 is February, etc.</returns>
	},
	__getUTCSeconds: function() {
		/// <summary>Gets the seconds component of this DateTime instance, according to universal time.</summary>
		/// <returns type="Number">Number. The seconds (0-59).</returns>
	},
	__setDate: function(day) {
		/// <summary>Sets the day component of this DateTime instance.</summary>
		/// <param name="day" type="Number">Number. The day of month (1-31).</param>
	},
	__setFullYear: function(year, month, day) {
		/// <summary>Sets the year component of this DateTime instance.</summary>
		/// <param name="year" type="Number">Number. A four-digit value representing the year.</param>
		/// <param name="month" type="Number" optional="true">Optional. Number. An integer between 0 and 11 representing the month.</param>
		/// <param name="day" type="Number" optional="true">Optional. Number. An integer between 1 and 31 representing the date.</param>
	},
	__setHours: function(hour, min, sec, millisec) {
		/// <summary>Sets the hours component of this DateTime instance.</summary>
		/// <param name="hour" type="Number">Number. An integer between 0 and 23 representing the hour.</param>
		/// <param name="min" type="Number" optional="true">Optional. Number. An integer between 0 and 59 representing the minutes.</param>
		/// <param name="sec" type="Number" optional="true">Optional. Number. An integer between 0 and 59 representing the seconds.</param>
		/// <param name="millisec" type="Number" optional="true">Optional. Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__setMilliseconds: function(millisec) {
		/// <summary>Sets the milliseconds component of this DateTime instance.</summary>
		/// <param name="millisec" type="Number">Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__setMinutes: function(min, sec, millisec) {
		/// <summary>Sets the minutes component of this DateTime instance.</summary>
		/// <param name="min" type="Number">Number. An integer between 0 and 59 representing the minutes.</param>
		/// <param name="sec" type="Number" optional="true">Optional. Number. An integer between 0 and 59 representing the seconds.</param>
		/// <param name="millisec" type="Number" optional="true">Optional. Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__setSeconds: function(sec, millisec) {
		/// <summary>Sets the seconds component of this DateTime instance.</summary>
		/// <param name="sec" type="Number">Number. An integer between 0 and 59 representing the seconds.</param>
		/// <param name="millisec" type="Number" optional="true">Optional. Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__setTime: function(millisec) {
		/// <summary>Sets a date and time by adding or subtracting a specified number of milliseconds to/from midnight 1 Jan 1970.</summary>
		/// <param name="millisec" type="Number">Number. The number of milliseconds to be added to, or subtracted from, midnight 1 Jan 1970.</param>
	},
	__setUTCDate: function(day) {
		/// <summary>Sets the day component of this DateTime instance, according to universal time.</summary>
		/// <param name="day" type="Number">Number. The day of month (1-31).</param>
	},
	__setUTCFullYear: function(year, month, day) {
		/// <summary>Sets the year component of this DateTime instance, according to universal time.</summary>
		/// <param name="year" type="Number">Number. A four-digit value representing the year.</param>
		/// <param name="month" type="Number" optional="true">Optional. Number. An integer between 0 and 11 representing the month.</param>
		/// <param name="day" type="Number" optional="true">Optional. Number. An integer between 1 and 31 representing the date.</param>
	},
	__setUTCHours: function(hour, min, sec, millisec) {
		/// <summary>Sets the hours component of this DateTime instance, according to universal time.</summary>
		/// <param name="hour" type="Number">Number. An integer between 0 and 23 representing the hour.</param>
		/// <param name="min" type="Number" optional="true">Optional. Number. An integer between 0 and 59 representing the minutes.</param>
		/// <param name="sec" type="Number" optional="true">Optional. Number. An integer between 0 and 59 representing the seconds.</param>
		/// <param name="millisec" type="Number" optional="true">Optional. Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__setUTCMilliseconds: function(millisec) {
		/// <summary>Sets the milliseconds component of this DateTime instance, according to universal time.</summary>
		/// <param name="millisec" type="Number">Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__setUTCMinutes: function(min, sec, millisec) {
		/// <summary>Sets the minutes component of this DateTime instance, according to universal time.</summary>
		/// <param name="min" type="Number">Number. An integer between 0 and 59 representing the minutes.</param>
		/// <param name="sec" type="Number" optional="true">Optional. Number. An integer between 0 and 59 representing the seconds.</param>
		/// <param name="millisec" type="Number" optional="true">Optional. Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__setUTCSeconds: function(sec, millisec) {
		/// <summary>Sets the seconds component of this DateTime instance, according to universal time.</summary>
		/// <param name="sec" type="Number">Number. An integer between 0 and 59 representing the seconds.</param>
		/// <param name="millisec" type="Number" optional="true">Optional. Number. An integer between 0 and 999 representing the milliseconds.</param>
	},
	__toDateString: function() {
		/// <summary>Converts the date component of this DateTime instance to a readable string.</summary>
		/// <returns type="String">String. A readable string representation of the date component of this DateTime instance.</returns>
	},
	__toLocaleDateString: function() {
		/// <summary>Converts the date component of this DateTime instance to a readable string, using locale conventions.</summary>
		/// <returns type="String">String. A readable locale string representation of the date component of this DateTime instance.</returns>
	},
	__toLocaleString: function() {
		/// <summary>Converts this DateTime instance to a readable string, using locale conventions.</summary>
		/// <returns type="String">String. A readable locale string representation of this DateTime instance.</returns>
	},
	__toLocaleTimeString: function() {
		/// <summary>Converts the time component of this DateTime instance to a readable string, using locale conventions.</summary>
		/// <returns type="String">String. A readable locale string representation of the time component of this DateTime instance.</returns>
	},
	__toString: function() {
		/// <summary>Converts this DateTime instance to a readable string.</summary>
		/// <returns type="String">String. A readable string representation of this DateTime instance.</returns>
	},
	__toTimeString: function() {
		/// <summary>Converts the time component of this DateTime instance to a readable string.</summary>
		/// <returns type="String">String. A readable string representation of the time component of this DateTime instance.</returns>
	},
	__toUTCString: function() {
		/// <summary>Converts this DateTime instance to a readable string, according to universal time.</summary>
		/// <returns type="String">String. A readable string representation of this DateTime instance.</returns>
	},
	__valueOf: function() {
		/// <summary>Represents the primitive value of this DateTime object.</summary>
		/// <returns type="Number">Number. The primitive value of this DateTime object.</returns>
	},
	addDays: function(days) {
		/// <summary>Adds the specified number of days to the current DateTime object.</summary>
		/// <param name="days" type="Number">Number. The number of days to add.</param>
	},
	addHours: function(hours) {
		/// <summary>Adds the specified number of hours to the current DateTime object.</summary>
		/// <param name="hours" type="Number">Number. The number of hours to add.</param>
	},
	addMilliseconds: function(milliseconds) {
		/// <summary>Adds the specified number of milliseconds to the current DateTime object.</summary>
		/// <param name="milliseconds" type="Number">Number. The number of milliseconds to add.</param>
	},
	addMinutes: function(minutes) {
		/// <summary>Adds the specified number of minutes to the current DateTime object.</summary>
		/// <param name="minutes" type="Number">Number. The number of minutes to add.</param>
	},
	addMonths: function(months) {
		/// <summary>Adds the specified number of months to the current DateTime object.</summary>
		/// <param name="months" type="Number">Number. The number of months to add.</param>
	},
	addSeconds: function(seconds) {
		/// <summary>Adds the specified number of seconds to the current DateTime object.</summary>
		/// <param name="seconds" type="Number">Number. The number of seconds to add.</param>
	},
	addYears: function(years) {
		/// <summary>Adds the specified number of years to the current DateTime object.</summary>
		/// <param name="years" type="Number">Number. The number of years to add.</param>
	},
	clone: function() {
		/// <summary>Returns a copy of the current DateTime object.</summary>
		/// <returns type="DateTime">The cloned DateTime object.</returns>
	},
	compareTo: function(date) {
		/// <summary>Compares the current DateTime instance with another DateTime object and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.</summary>
		/// <param name="date" type="DateTime">DateTime. A DateTime object to compare with this instance.</param>
		/// <returns type="Number">Number. A value that indicates the relative order of the DateTime objects being compared.</returns>
	},
	equals: function(date) {
		/// <summary>Returns a value indicating whether two DateTime objects are equal.</summary>
		/// <param name="date" type="DateTime">DateTime. The DateTime object to compare with.</param>
		/// <returns type="Boolean">Boolean. True if the values are equal, otherwise false.</returns>
	},
	getDate: function() {
		/// <summary>For internal use only.</summary>
		/// <returns type="Object"></returns>
	},
	getDaysInMonth: function() {
		/// <summary>Returns the number of days in the month of the current DateTime instance.</summary>
		/// <returns type="Number">Number. The number of days.</returns>
	},
	getMonth: function() {
		/// <summary>Returns the month component of the current DateTime object.</summary>
		/// <returns type="Number">Number. The month.</returns>
	},
	greaterThan: function(date) {
		/// <summary>Checks if this DateTime object is greater than the specified DateTime object.</summary>
		/// <param name="date" type="DateTime">The DateTime object to compare with.</param>
		/// <returns type="Boolean">Boolean. true if this value is greater than the specified value, otherwise false.</returns>
	},
	greaterThanOrEqual: function(date) {
		/// <summary>Checks if this DateTime object is greater than or equal to the specified DateTime object.</summary>
		/// <param name="date" type="DateTime">The DateTime object to compare with.</param>
		/// <returns type="Boolean">Boolean. true if this value is greater than or equal to the specified value, otherwise false.</returns>
	},
	isLeapYear: function() {
		/// <summary>Returns a value indicating whether the year of the current DateTime instance is a leap year.</summary>
		/// <returns type="Boolean">Boolean. True if it is a leap year, otherwise false.</returns>
	},
	lessThan: function(date) {
		/// <summary>Checks if this DateTime object is less than the specified DateTime object.</summary>
		/// <param name="date" type="DateTime">The DateTime object to compare with.</param>
		/// <returns type="Boolean">Boolean. true if this value is less than the specified value, otherwise false.</returns>
	},
	lessThanOrEqual: function(date) {
		/// <summary>Checks if this DateTime object is less than or equal to the specified DateTime object.</summary>
		/// <param name="date" type="DateTime">DateTime. The DateTime object to compare with.</param>
		/// <returns type="Boolean">Boolean. true if this value is less than or equal to the specified value, otherwise false.</returns>
	},
	subtract: function(date) {
		/// <summary>Subtracts the specified date from the current date and returns the number of milliseconds between them.</summary>
		/// <param name="date" type="DateTime">DateTime. The date to subtract.</param>
		/// <returns type="Number">Number. The number of milliseconds between the specified date and this date.</returns>
	},
	toString: function(format, formatInfo) {
		/// <summary>Returns a string representation of the current DateTime object.</summary>
		/// <param name="format" type="String" optional="true">Optional. The DateTime format used for the string representation.</param>
		/// <param name="formatInfo" type="Object" optional="true">Optional. Object. The formatInfo object used for the string representation.</param>
		/// <returns type="String">The string representation of the current DateTime object.</returns>
	},
	valueOf: function() {
		/// <summary>Represents the primitive value of this DateTime object.</summary>
		/// <returns type="Number">The primitive value of this DateTime object in milliseconds.</returns>
	},
};
MindFusion.Scheduling.DateTime.__class = true;

MindFusion.Scheduling.DateTime.addDays = function(date, days) {
	/// <summary>Adds the specified number of days to the specified DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. The DateTime instance to modify.</param>
	/// <param name="days" type="Number">Number. The number of days to add.</param>
	/// <returns type="DateTime">DateTime. The modified DateTime instance.</returns>
};
MindFusion.Scheduling.DateTime.addHours = function(date, hours) {
	/// <summary>Adds the specified number of hours to the specified DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. The DateTime instance to modify.</param>
	/// <param name="hours" type="Number">Number. The number of hours to add.</param>
	/// <returns type="DateTime">DateTime. The modified DateTime instance.</returns>
};
MindFusion.Scheduling.DateTime.addMilliseconds = function(date, milliseconds) {
	/// <summary>Adds the specified number of milliseconds to the specified DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. The DateTime instance to modify.</param>
	/// <param name="milliseconds" type="Number">Number. The number of milliseconds to add.</param>
	/// <returns type="DateTime">The modified DateTime instance.</returns>
};
MindFusion.Scheduling.DateTime.addMinutes = function(date, minutes) {
	/// <summary>Adds the specified number of minutes to the specified DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. The DateTime instance to modify.</param>
	/// <param name="minutes" type="Number">Number. The number of minutes to add.</param>
	/// <returns type="DateTime">DateTime. The modified DateTime instance.</returns>
};
MindFusion.Scheduling.DateTime.addMonths = function(date, months) {
	/// <summary>Adds the specified number of months to the specified DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. The DateTime instance to modify.</param>
	/// <param name="months" type="Number">Number. The number of months to add.</param>
	/// <returns type="DateTime">The modified DateTime instance.</returns>
};
MindFusion.Scheduling.DateTime.addSeconds = function(date, seconds) {
	/// <summary>Adds the specified number of seconds to the specified DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. The DateTime instance to modify.</param>
	/// <param name="seconds" type="Number">Number. The number of seconds to add.</param>
	/// <returns type="DateTime">DateTime. The modified DateTime instance.</returns>
};
MindFusion.Scheduling.DateTime.addYears = function(date, years) {
	/// <summary>Adds the specified number of years to the specified DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. The DateTime instance to modify.</param>
	/// <param name="years" type="Number">Number. The number of years to add.</param>
	/// <returns type="DateTime">DateTime. The modified DateTime instance.</returns>
};
MindFusion.Scheduling.DateTime.combine = function(date, time) {
	/// <summary>Combines the date component of a DateTime object and the time component of another DateTime object into a new DateTime object.</summary>
	/// <param name="date" type="DateTime">DateTime. A DateTime object to get the date part from.</param>
	/// <param name="time" type="DateTime">DateTime. A DateTime object to get the time part from.</param>
	/// <returns type="DateTime">The new combined DateTime object.</returns>
};
MindFusion.Scheduling.DateTime.daysBetween = function(date1, date2) {
	/// <summary>Returns the number of days between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime.&#160;The first&#160;DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime.&#160;The second&#160;DateTime instance.</param>
	/// <returns type="Number">Number. The number of days.</returns>
};
MindFusion.Scheduling.DateTime.fromDateParts = function(year, month, day, hours, minutes, seconds, milliseconds) {
	/// <summary>Creates a new DateTime object, by specifying its different date and time components.</summary>
	/// <param name="year" type="Number">Number. The year component.</param>
	/// <param name="month" type="Number">Number. The month component (0-11).</param>
	/// <param name="day" type="Number" optional="true">Optional. Number. The day component (1-31). If not provided, a default value of 1 will be used.</param>
	/// <param name="hours" type="Number" optional="true">Optional. Number. The hours component (0-23). If not provided, a default value of 0 will be used.</param>
	/// <param name="minutes" type="Number" optional="true">Optional. Number. The minutes component (0-59). If not provided, a default value of 0 will be used.</param>
	/// <param name="seconds" type="Number" optional="true">Optional. Number. The seconds component (0-59). If not provided, a default value of 0 will be used.</param>
	/// <param name="milliseconds" type="Number" optional="true">Optional. Number. The milliseconds component (0-999). If not provided, a default value of 0 will be used.</param>
	/// <returns type="DateTime">The new DateTime object, or null if a DateTime instance cannot be created from the provided values.</returns>
};
MindFusion.Scheduling.DateTime.fromDateString = function(dateString) {
	/// <summary>Creates a new DateTime object from a provided date string.</summary>
	/// <param name="dateString" type="String">String. The date string to create the DateTime from.</param>
	/// <returns type="DateTime">DateTime. The new DateTime object, or null if a DateTime instance cannot be created from the provided string.</returns>
};
MindFusion.Scheduling.DateTime.fromMilliseconds = function(milliseconds) {
	/// <summary>Creates a new DateTime object from the number of milliseconds since Jan 1st 1970.</summary>
	/// <param name="milliseconds" type="Number">Number. The number of milliseconds since Jan 1st 1970;</param>
	/// <returns type="DateTime">DateTime. The new DateTime object, or null if a DateTime instance cannot be created from the provided value.</returns>
};
MindFusion.Scheduling.DateTime.getDayOfMonth = function(date) {
	/// <summary>Returns the day of the month of the specified DateTime.</summary>
	/// <param name="date" type="DateTime">A DateTime instance.</param>
	/// <returns type="Number">Number. The day of the month.</returns>
};
MindFusion.Scheduling.DateTime.getDayOfWeek = function(date) {
	/// <summary>Returns the day of the week of the specified DateTime.</summary>
	/// <param name="date" type="DateTime">A DateTime instance.</param>
	/// <returns type="Number">Number. The day of the week.</returns>
};
MindFusion.Scheduling.DateTime.getDaysInMonth = function(date) {
	/// <summary>Returns the number of days in the month of the specified DateTime.</summary>
	/// <param name="date" type="DateTime">A DateTime instance.</param>
	/// <returns type="Number">Number. The number of days.</returns>
};
MindFusion.Scheduling.DateTime.getMonth = function(date) {
	/// <summary>Returns the month component of the specified DateTime.</summary>
	/// <param name="date" type="DateTime">A DateTime instance.</param>
	/// <returns type="Number">Number. The month.</returns>
};
MindFusion.Scheduling.DateTime.getWeekFirstDate = function(date, formatInfo) {
	/// <summary>Returns the beginning of the week of the specified DateTime.</summary>
	/// <param name="date" type="DateTime">A DateTime instance.</param>
	/// <param name="formatInfo" type="Object" optional="true">Optional. Object. The formatInfo object.</param>
	/// <returns type="DateTime">A DateTime instance specifying the beginning of the week.</returns>
};
MindFusion.Scheduling.DateTime.getYear = function(date) {
	/// <summary>Returns the year component of the specified DateTime.</summary>
	/// <param name="date" type="DateTime">DateTime. A DateTime instance.</param>
	/// <returns type="Number">Number. The year.</returns>
};
MindFusion.Scheduling.DateTime.hoursBetween = function(date1, date2) {
	/// <summary>Returns the number of hours between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime. The second &#160;DateTime instance.</param>
	/// <returns type="Number">Number. The number of hours.</returns>
};
MindFusion.Scheduling.DateTime.maxDate = function(date1, date2) {
	/// <summary>Returns the latter of two DateTime objects.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first&#160;DateTime object.</param>
	/// <param name="date2" type="DateTime">DateTime. The second&#160;DateTime object.</param>
	/// <returns type="DateTime">The latter of two DateTime objects.</returns>
};
MindFusion.Scheduling.DateTime.maxValue = function() {
	/// <summary>Returns the highest possible DateTime value.</summary>
	/// <returns type="DateTime">The highest possible DateTime value.</returns>
};
MindFusion.Scheduling.DateTime.millisecondsBetween = function(date1, date2) {
	/// <summary>Returns the number of milliseconds between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first&#160;DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime. The second&#160;DateTime instance.</param>
	/// <returns type="Number">Number. The number of milliseconds.</returns>
};
MindFusion.Scheduling.DateTime.minDate = function(date1, date2) {
	/// <summary>Returns the former of two DateTime objects.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first&#160;DateTime object.</param>
	/// <param name="date2" type="DateTime">DateTime. The second&#160;DateTime object.</param>
	/// <returns type="DateTime">The former of two DateTime objects.</returns>
};
MindFusion.Scheduling.DateTime.minutesBetween = function(date1, date2) {
	/// <summary>Returns the number of minutes between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first&#160;DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime.&#160;The second&#160;DateTime instance.</param>
	/// <returns type="Number">Number. The number of minutes.</returns>
};
MindFusion.Scheduling.DateTime.minValue = function() {
	/// <summary>Returns the lowest possible DateTime value.</summary>
	/// <returns type="DateTime">The lowest possible DateTime value.</returns>
};
MindFusion.Scheduling.DateTime.monthsBetween = function(date1, date2) {
	/// <summary>Returns the number of months between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first&#160;DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime. The second&#160;DateTime instance.</param>
	/// <returns type="Number">Number. The number of months.</returns>
};
MindFusion.Scheduling.DateTime.now = function() {
	/// <summary>Returns a DateTime object representing the current DateTime.</summary>
	/// <returns type="DateTime">The DateTime object representing the current DateTime.</returns>
};
MindFusion.Scheduling.DateTime.secondsBetween = function(date1, date2) {
	/// <summary>Returns the number of seconds between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime. The second DateTime instance.</param>
	/// <returns type="Number">Number. The number of seconds.</returns>
};
MindFusion.Scheduling.DateTime.subtract = function(date1, date2) {
	/// <summary>Returns the number of milliseconds between the specified dates.</summary>
	/// <param name="date1" type="DateTime">DateTime. The date to subtract from.</param>
	/// <param name="date2" type="DateTime">DateTime. The date to subtract.</param>
	/// <returns type="Number">Number. The number of milliseconds between the specified dates.</returns>
};
MindFusion.Scheduling.DateTime.today = function() {
	/// <summary>Returns a DateTime object representing the current Date.</summary>
	/// <returns type="DateTime">The DateTime object representing the current Date.</returns>
};
MindFusion.Scheduling.DateTime.weeksBetween = function(date1, date2) {
	/// <summary>Returns the number of weeks between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first&#160;DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime. The second&#160;DateTime instance.</param>
	/// <returns type="Number">Number. The number of weeks.</returns>
};
MindFusion.Scheduling.DateTime.yearsBetween = function(date1, date2) {
	/// <summary>Returns the number of years between two DateTime instances.</summary>
	/// <param name="date1" type="DateTime">DateTime. The first DateTime instance.</param>
	/// <param name="date2" type="DateTime">DateTime. The second DateTime instance.</param>
	/// <returns type="Number">Number. The number of years.</returns>
};

MindFusion.Scheduling.DayOfWeek = {
		/// <summary>Specifies the day of the week.</summary>
		/// <field name="Friday">Indicates Friday.</field>
		/// <field name="Monday">Indicates Monday.</field>
		/// <field name="Saturday">Indicates Saturday.</field>
		/// <field name="Sunday">Indicates Sunday.</field>
		/// <field name="Thursday">Indicates Thursday.</field>
		/// <field name="Tuesday">Indicates Tuesday.</field>
		/// <field name="Wednesday">Indicates Wednesday.</field>
	Friday: 5,
	Monday: 1,
	Saturday: 6,
	Sunday: 0,
	Thursday: 4,
	Tuesday: 2,
	Wednesday: 3
}
MindFusion.Scheduling.DayOfWeek.__enum = true;

MindFusion.Scheduling.DayOfWeekFormat = {
		/// <summary>Specifies the display format of a day of the week.</summary>
		/// <field name="Abbreviated">The first three letters of the day of the week are displayed.</field>
		/// <field name="Full">The complete name of the day of the week is displayed.</field>
		/// <field name="SingleLetter">Only the first letter of the name of the day is displayed.</field>
	Abbreviated: 1,
	Full: 2,
	SingleLetter: 0
}
MindFusion.Scheduling.DayOfWeekFormat.__enum = true;

MindFusion.Scheduling.DayOfWeekType = {
		/// <summary>Specifies the type of week day to use with monthly and yearly recurrence patterns.</summary>
		/// <field name="AnyDay">Indicates any day.</field>
		/// <field name="Friday">Indicates Friday.</field>
		/// <field name="Monday">Indicates Monday.</field>
		/// <field name="Saturday">Indicates Saturday.</field>
		/// <field name="Sunday">Indicates Sunday.</field>
		/// <field name="Thursday">Indicates Thursday.</field>
		/// <field name="Tuesday">Indicates Tuesday.</field>
		/// <field name="Wednesday">Indicates Wednesday.</field>
		/// <field name="Weekend">Indicates a weekend day.</field>
		/// <field name="Workday">Indicates a workday.</field>
	AnyDay: 0,
	Friday: 8,
	Monday: 4,
	Saturday: 9,
	Sunday: 3,
	Thursday: 7,
	Tuesday: 5,
	Wednesday: 6,
	Weekend: 2,
	Workday: 1
}
MindFusion.Scheduling.DayOfWeekType.__enum = true;

MindFusion.Scheduling.DaysOfWeek = {
		/// <summary>Specifies the day of the week. This enum allows bitwise combination of its members.</summary>
		/// <field name="All">Indicates all days of the week.</field>
		/// <field name="Friday">Indicates Friday.</field>
		/// <field name="Monday">Indicates Monday.</field>
		/// <field name="None">Indicates an undefined day value.</field>
		/// <field name="Saturday">Indicates Saturday.</field>
		/// <field name="Sunday">Indicates Sunday.</field>
		/// <field name="Thursday">Indicates Thursday.</field>
		/// <field name="Tuesday">Indicates Tuesday.</field>
		/// <field name="Wednesday">Indicates Wednesday.</field>
	All: 127,
	Friday: 32,
	Monday: 2,
	None: 0,
	Saturday: 64,
	Sunday: 1,
	Thursday: 16,
	Tuesday: 4,
	Wednesday: 8
}
MindFusion.Scheduling.DaysOfWeek.__enum = true;

MindFusion.Scheduling.FormEventArgs.prototype = {
};
MindFusion.Scheduling.FormEventArgs.__class = true;

MindFusion.Scheduling.GroupType = {
		/// <summary>Specifies grouping or filtering criteria for views that support grouping.</summary>
		/// <field name="FilterByContacts">Filter by contacts.</field>
		/// <field name="FilterByLocations">Filter by locations.</field>
		/// <field name="FilterByResources">Filter by resources.</field>
		/// <field name="FilterByTasks">Filter by tasks.</field>
		/// <field name="GroupByContacts">Group by contacts.</field>
		/// <field name="GroupByLocations">Group by locations.</field>
		/// <field name="GroupByResources">Group by resources.</field>
		/// <field name="GroupByTasks">Group by tasks.</field>
		/// <field name="None">No grouping or filtering.</field>
	FilterByContacts: 5,
	FilterByLocations: 6,
	FilterByResources: 8,
	FilterByTasks: 7,
	GroupByContacts: 1,
	GroupByLocations: 3,
	GroupByResources: 2,
	GroupByTasks: 4,
	None: 0
}
MindFusion.Scheduling.GroupType.__enum = true;

MindFusion.Scheduling.HeaderEventArgs.prototype = {
};
MindFusion.Scheduling.HeaderEventArgs.__class = true;

MindFusion.Scheduling.HeaderType = {
		/// <summary>Specifies the type of a calendar header.</summary>
		/// <field name="Cell">Indicates a date cell header.</field>
		/// <field name="DayNames">Indicates the day names header.</field>
		/// <field name="Group">Indicates the group header.</field>
		/// <field name="Main">Indicates the main view header.</field>
		/// <field name="Timeline">Indicates the timeline header.</field>
		/// <field name="WeekNumbers">Indicates the week numbers header.</field>
	Cell: 0,
	DayNames: 4,
	Group: 2,
	Main: 1,
	Timeline: 3,
	WeekNumbers: 5
}
MindFusion.Scheduling.HeaderType.__enum = true;

MindFusion.Scheduling.HorizontalHeaderStyle = {
		/// <summary>Specifies the appearance of a horizontal header in the calendar.</summary>
		/// <field name="Bottom">The header is displayed to the bottom side of the calendar.</field>
		/// <field name="None">The header is not displayed.</field>
		/// <field name="Top">The header is displayed to the top side of the calendar.</field>
	Bottom: 2,
	None: 0,
	Top: 1
}
MindFusion.Scheduling.HorizontalHeaderStyle.__enum = true;

MindFusion.Scheduling.Item.prototype = {
	clone: function() {
		/// <summary>Creates an exact copy of this item.</summary>
		/// <returns type="Item">Item. An item, identical to this one.</returns>
	},
	fromJson: function(json) {
		/// <summary>Deserializes this item from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromJson: function(json, context) {
		/// <summary>Deserializes this Item from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
	},
	loadFromXml: function(element, context) {
		/// <summary>Loads the item content from an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that contains the item's serialized content.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	saveToXml: function(element, context) {
		/// <summary>Saves the item content into an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that will contain the item's data.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	toJson: function(context) {
		/// <summary>Serializes this Item into a JSON string.</summary>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
		/// <returns type="String">String. A string containing the item's JSON representation.</returns>
	}
};
MindFusion.Scheduling.Item.__class = true;

MindFusion.Scheduling.ItemEventArgs.prototype = {
};
MindFusion.Scheduling.ItemEventArgs.__class = true;

MindFusion.Scheduling.ItemModifiedEventArgs.prototype = {
};
MindFusion.Scheduling.ItemModifiedEventArgs.__class = true;

MindFusion.Scheduling.ItemModifyAction = {
		/// <summary>Specifies the type of modification action used, when an item is modified.</summary>
		/// <field name="Clone">Specifies that the item was interactively cloned.</field>
		/// <field name="Create">Specifies that the item was interactively created.</field>
		/// <field name="Delete">Specifies that the item was interactively deleted.</field>
		/// <field name="Drag">Specifies that the item is modified through an interactive drag operation.</field>
		/// <field name="Edit">Specifies that the item was modified through a modification of one or more of its properties, excluding drag and resize interactive operations.</field>
		/// <field name="InplaceEdit">Specifies that the item is modified through an interactive inplace-edit operation.</field>
		/// <field name="Resize">Specifies that the item is modified through an interactive resize operation.</field>
	Clone: 5,
	Create: -1,
	Delete: 4,
	Drag: 1,
	Edit: 0,
	InplaceEdit: 3,
	Resize: 2
}
MindFusion.Scheduling.ItemModifyAction.__enum = true;

MindFusion.Scheduling.ItemModifyingEventArgs.prototype = {
};
MindFusion.Scheduling.ItemModifyingEventArgs.__class = true;

MindFusion.Scheduling.ItemSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies the&#160;property values from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.ItemSettings.__class = true;

MindFusion.Scheduling.JsonPersistContext.prototype = {
	readDateTime: function(value) {
		/// <summary>Reads a DateTime value.</summary>
		/// <param name="value" type="String">String. A string representing the DateTime.</param>
	},
	writeDateTime: function(value) {
		/// <summary>Writes a DateTime value.</summary>
		/// <param name="value" type="DateTime">DateTime. The DateTime value that should be saved.</param>
	}
};
MindFusion.Scheduling.JsonPersistContext.__class = true;

MindFusion.Scheduling.Keys = {
		/// <summary>Identifies special Keys.</summary>
		/// <field name="Alt">Indicates the ALT modifier key.</field>
		/// <field name="Control">Indicates the CTRL modifier key.</field>
		/// <field name="None">No key pressed.</field>
		/// <field name="Shift">Indicates the SHIFT modifier key.</field>
	Alt: 3,
	Control: 2,
	None: 0,
	Shift: 1
}
MindFusion.Scheduling.Keys.__enum = true;

MindFusion.Scheduling.ListSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies property values from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.ListSettings.__class = true;

MindFusion.Scheduling.LocalStrings.prototype = {
};
MindFusion.Scheduling.LocalStrings.__class = true;

MindFusion.Scheduling.Location.prototype = {
	fromJson: function(json) {
		/// <summary>Deserializes this location from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromJson: function(json, context) {
		/// <summary>Deserializes this Location from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
	},
	loadFromXml: function(element, context) {
		/// <summary>Loads the location content from an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that contains the location's serialized content.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	saveToXml: function(element, context) {
		/// <summary>Saves the Location content into an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that will contain the location's data.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	toJson: function(context) {
		/// <summary>Serializes this location into a JSON string.</summary>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
		/// <returns type="String">String. A string containing the location's JSON representation.</returns>
	}
};
MindFusion.Scheduling.Location.__class = true;

MindFusion.Scheduling.MainHeaderStyle = {
		/// <summary>Specifies the appearance of the calendar's main header.</summary>
		/// <field name="Buttons">The header displays navigation buttons.</field>
		/// <field name="None">The header is not displayed.</field>
		/// <field name="Title">The header displays a title.</field>
	Buttons: 2,
	None: 0,
	Title: 1
}
MindFusion.Scheduling.MainHeaderStyle.__enum = true;

MindFusion.Scheduling.MonthlyRecurrence = {
		/// <summary>Specifies monthly recurrence patterns.</summary>
		/// <field name="ByDayNumber">The event occurs on the given day of the month.</field>
		/// <field name="ByDayType">The event occurs on a given type of day in the specified week of the month.</field>
	ByDayNumber: 0,
	ByDayType: 1
}
MindFusion.Scheduling.MonthlyRecurrence.__enum = true;

MindFusion.Scheduling.MonthRangeSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies property values from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.MonthRangeSettings.__class = true;

MindFusion.Scheduling.MonthSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies property values from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.MonthSettings.__class = true;

MindFusion.Scheduling.Occurrence = {
		/// <summary>Specifies the index of occurrence.</summary>
		/// <field name="First">Indicates the first occurrence.</field>
		/// <field name="Fourth">Indicates the fourth occurrence.</field>
		/// <field name="Last">Indicates the last occurrence.</field>
		/// <field name="Second">Indicates the second occurrence.</field>
		/// <field name="Third">Indicates the third occurrence.</field>
	First: 0,
	Fourth: 3,
	Last: 4,
	Second: 1,
	Third: 2
}
MindFusion.Scheduling.Occurrence.__enum = true;

MindFusion.Scheduling.Orientation = {
		/// <summary>Specifies orientation for calendar elements.</summary>
		/// <field name="Horizontal">Indicates a horizontal orientation.</field>
		/// <field name="Vertical">Indicates a vertical orientation.</field>
	Horizontal: 0,
	Vertical: 1
}
MindFusion.Scheduling.Orientation.__enum = true;

MindFusion.Scheduling.Recurrence.prototype = {
	applyPattern: function(recurrence) {
		/// <summary>Copies the property values of the specified Recurrence object asvalues for the properties of this Recurrence object.This method behaves similarly to the clone method but does not create a new object.</summary>
		/// <param name="recurrence" type="Recurrence">Recurrence. The Recurrence object whose fields to copy.</param>
	},
	associateWith: function(master) {
		/// <summary>Associates the Recurrence with the specified item. If the supplied reference is null,the recurrence is detached from the currently associated master.</summary>
		/// <param name="master" type="Item">Item. The item to associate with.</param>
	},
	clearExceptions: function() {
		/// <summary>Removes all exceptions of this Recurrence.</summary>
	},
	clone: function() {
		/// <summary>Creates an exact copy of this Recurrence object.</summary>
		/// <returns type="Recurrence">Recurrence. A new Recurrence object, identical to the current one.</returns>
	},
	fromJson: function(json) {
		/// <summary>Deserializes this Recurrence from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromJson: function(json, context) {
		/// <summary>Deserializes this Recurrence from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
	},
	generateItems: function(startDate, endDate) {
		/// <summary>Creates occurrence items for this Recurrence in the specified date range.</summary>
		/// <param name="startDate" type="DateTime">DateTime. The range start date.</param>
		/// <param name="endDate" type="DateTime">DateTime. The range end date.</param>
		/// <returns type="Array">Array. A collection of Item instances representing each occurrence of the recurrent event in the specified date range.</returns>
	},
	getEndDate: function() {
		/// <summary>Returns the end date for this Recurrence. The end date is calculated based on the specified repeat number if RecurrenceEnd is set to NumOccurrences.</summary>
		/// <returns type="DateTime">DateTime. The end date of the Recurrence if the recurrence is set to expire or DateTime.MaxValue otherwise.</returns>
	},
	getExceptions: function() {
		/// <summary>Gets a list with all Recurrence exceptions.</summary>
		/// <returns type="Dictionary">A&#160;JavaScript Map object containing&#160;all exceptions.</returns>
	},
	getOccurrence: function(index, refIsDeleted, noException) {
		/// <summary>Returns the occurrence with the specified index.</summary>
		/// <param name="index" type="Number">Number. The index of the occurrence to retrieve.</param>
		/// <param name="refIsDeleted" type="*">*. If the specified occurrence is an exception, this parameter indicates, upon function completion, whether the exception is deleted or not.</param>
		/// <param name="noException" type="Boolean">Boolean. Specifies whether to return the original item, in case this occurrence is an exception.</param>
		/// <returns type="Item">Item. A reference to the occurrence with the specified index or null, if there is no such occurrence.</returns>
	},
	loadFromXml: function(element, context) {
		/// <summary>Loads the Recurrence content from an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that contains the recurrence's serialized content.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	markException: function(item, deleted, reminder) {
		/// <summary>Marks the specified item as an exception in the Recurrence pattern.</summary>
		/// <param name="item" type="Item">Item. The item to be marked as an exception.</param>
		/// <param name="deleted" type="Boolean" optional="true">Optional. Boolean. Specifies whether the exception is created by deleting oneoccurrence from the recurrent pattern or by changing the occurrence time properties.</param>
		/// <param name="reminder" type="*">*. For internal use.</param>
	},
	removeException: function(item) {
		/// <summary>Removes the exception associated with the specified item from the recurrence.</summary>
		/// <param name="item" type="Item">Item. The item whose exception to remove.</param>
	},
	samePatternAs: function(recurrence) {
		/// <summary>Determines whether two Recurrence objects define the same recurrence pattern.</summary>
		/// <param name="recurrence" type="Recurrence">A Recurrence object to compare with this Recurrence.</param>
		/// <returns type="Boolean">Boolean. true if the Recurrence instances have the same recurrence pattern; otherwise false.</returns>
	},
	saveToXml: function(element, context) {
		/// <summary>Saves the Recurrence content into an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that will contain the recurrence's data.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	toJson: function(context) {
		/// <summary>Serializes this Recurrence into a JSON string.</summary>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
		/// <returns type="String">String. A string containing the Recurrence's JSON representation.</returns>
	},
	toLocalizedString: function(formatInfo, localInfo) {
		/// <summary>Returns a localized string that represents this Recurrence using the specified date and time formatting info and localization information.</summary>
		/// <param name="formatInfo" type="Object">Object. Specifies how date and time values are formatted and displayed.</param>
		/// <param name="localInfo" type="Object">Object. Specifies localized strings used in the representation.</param>
		/// <returns type="String">A localized string representation of this Recurrence object.</returns>
	},
};
MindFusion.Scheduling.Recurrence.__class = true;

MindFusion.Scheduling.RecurrenceEnd = {
		/// <summary>Specifies when to stop repeating recurring events.</summary>
		/// <field name="EndDate">The recurrence ends at a specified date.</field>
		/// <field name="Never">Never stop repeating events.</field>
		/// <field name="NumOccurrences">Stop repeating events after a specified number of occurrences.</field>
	EndDate: 2,
	Never: 0,
	NumOccurrences: 1
}
MindFusion.Scheduling.RecurrenceEnd.__enum = true;

MindFusion.Scheduling.RecurrencePattern = {
		/// <summary>Specifies the interval at which recurring events occur.</summary>
		/// <field name="ByTimeInterval">Repeats an event over a specified time interval.</field>
		/// <field name="Daily">Repeats an event every day.</field>
		/// <field name="Monthly">Repeats an event every month.</field>
		/// <field name="Weekly">Repeats an event every week.</field>
		/// <field name="Yearly">Repeats an event every year.</field>
	ByTimeInterval: 4,
	Daily: 0,
	Monthly: 2,
	Weekly: 1,
	Yearly: 3
}
MindFusion.Scheduling.RecurrencePattern.__enum = true;

MindFusion.Scheduling.RecurrenceState = {
		/// <summary>Specifies the recurrence state of items.</summary>
		/// <field name="Exception">Specifies an exception of a recurring event.</field>
		/// <field name="Master">Specifies a recurring event.</field>
		/// <field name="None">Specifies an one-time non-recurring event.</field>
		/// <field name="Occurrence">Specifies a single occurrence of a recurring event.</field>
	Exception: 2,
	Master: 3,
	None: 0,
	Occurrence: 1
}
MindFusion.Scheduling.RecurrenceState.__enum = true;

MindFusion.Scheduling.Reminder.prototype = {
	clone: function() {
		/// <summary>Returns an exact copy of this Reminder object.</summary>
		/// <returns type="Reminder">Reminder. The newly created Reminder object.</returns>
	},
	fromJson: function(json) {
		/// <summary>Deserializes this Reminder from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromJson: function(json, context) {
		/// <summary>Deserializes this reminder from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
	},
	loadFromXml: function(element, context) {
		/// <summary>Loads the Reminder content from an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that contains the reminder's serialized content.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	saveToXml: function(element, context) {
		/// <summary>Saves the Reminder content into an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that will contain the reminder's data.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	toJson: function(context) {
		/// <summary>Serializes this reminder into a JSON string.</summary>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
		/// <returns type="String">String. A string containing the reminder's JSON representation.</returns>
	},
};
MindFusion.Scheduling.Reminder.__class = true;

MindFusion.Scheduling.ReminderType = {
		/// <summary>Specifies the type of a Reminder.</summary>
		/// <field name="Exact">Trigger the reminder at the exact time specified in its Date property.Note: Recurring items cannot have exact reminders.</field>
		/// <field name="Leading">Trigger the reminder at the specified TimeInterval before the item's scheduled start time.Note: Tasks cannot have leading reminders.</field>
	Exact: 0,
	Leading: 1
}
MindFusion.Scheduling.ReminderType.__enum = true;

MindFusion.Scheduling.Resource.prototype = {
	fromJson: function(json) {
		/// <summary>Deserializes this Resource from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromJson: function(json, context) {
		/// <summary>Deserializes this resource from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
	},
	loadFromXml: function(element, context) {
		/// <summary>Loads the Resource content from an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that contains the resource's serialized content.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	saveToXml: function(element, context) {
		/// <summary>Saves the Resource content into an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that will contain the resource's data.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	toJson: function(context) {
		/// <summary>Serializes this resource into a JSON string.</summary>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
		/// <returns type="String">String. A string containing the resource's JSON representation.</returns>
	},
};
MindFusion.Scheduling.Resource.__class = true;

MindFusion.Scheduling.ResourceViewSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies property values for this ResourceViewSettings instance from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.ResourceViewSettings.__class = true;

MindFusion.Scheduling.ResourceViewTimeline = {
		/// <summary>Specifies the type of a timeline in a Resource view.</summary>
		/// <field name="Bottom">Indicates the bottom timeline.</field>
		/// <field name="Middle">Indicates the middle timeline.</field>
		/// <field name="Top">Indicates the top timeline.</field>
	Bottom: 2,
	Middle: 1,
	Top: 0
}
MindFusion.Scheduling.ResourceViewTimeline.__enum = true;

MindFusion.Scheduling.Schedule.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies property values for this Schedule&#160;from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	},
	fromJson: function(json) {
		/// <summary>Deserializes the Schedule from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromXmlDocument: function(document) {
		/// <summary>Loads schedule data from specified XML Document.</summary>
		/// <param name="document" type="Document">Document. A DOM Document object containing XML-serialized schedule data.</param>
	},
	getAllItems: function(startTime, endTime, resource) {
		/// <summary>Retrieves all events, including recurrent item instances, scheduled to occur in the specified time interval.</summary>
		/// <param name="startTime" type="DateTime">DateTime. Time interval start.</param>
		/// <param name="endTime" type="DateTime" optional="true">Optional. DateTime. Time interval end.</param>
		/// <param name="resource" type="Resource" optional="true">Optional. Resource. A resource that must be related to the event.</param>
		/// <returns type="List">List. The list of events scheduled to occur in the specified period.</returns>
	},
	getItemById: function(id, occurrenceIndex) {
		/// <summary>Gets the item with the specified id.</summary>
		/// <param name="id" type="String">String. The id of the item.</param>
		/// <param name="occurrenceIndex" type="Number" optional="true">Optional. Number. The occurrence index of the item.</param>
		/// <returns type="Item">Item. The item; null if no item with the specified id has been found.</returns>
	},
	getMasterById: function(id) {
		/// <summary>In a recurrence, gets the recurrence master item with the specified id.</summary>
		/// <param name="id" type="String">String. The id of the master item.</param>
		/// <returns type="Item">The item; null if no master item with the specified id has been found.</returns>
	},
	getResourceById: function(id) {
		/// <summary>Returns a resource from a schedule resources collection by a specified id.</summary>
		/// <param name="id" type="String">String. The id of the resource.</param>
		/// <returns type="Resource">Resource. The resource object if found, null otherwise.</returns>
	},
	loadFromXml: function(fileUrl, onLoad, onError) {
		/// <summary>Loads the schedule from an XML file.</summary>
		/// <param name="fileUrl" type="String">String. The URL of an XML file where the data should be read from.</param>
		/// <param name="onLoad" type="function" optional="true">Optional. function. A callback that should be invoked if the file is loaded successfully.</param>
		/// <param name="onError" type="function" optional="true">Optional. function. A callback that should be invoked if the file could not be downloaded.</param>
	},
	saveToXml: function(url) {
		/// <summary>Saves the schedule to an XML file.</summary>
		/// <param name="url" type="String">String. A URL specifying where the schedule's XML should be posted to.</param>
	},
	toJson: function() {
		/// <summary>Serializes the schedule into a JSON string.</summary>
		/// <returns type="String">String. A string containing the schedule's JSON representation.</returns>
	},
	toXmlDocument: function() {
		/// <summary>Saves the schedule into an XML Document.</summary>
		/// <returns type="Document">Document. A DOM Document object containing XML-serialized schedule contents.</returns>
	}
};
MindFusion.Scheduling.Schedule.__class = true;

MindFusion.Scheduling.Schedule.registerClass = function(itemClass, xmlClassId, jsonClassId, classVersion) {
	/// <summary>Registers a schedule item or resource class for serialization support.</summary>
	/// <param name="itemClass" type="Object">Object. An object identifying the class.</param>
	/// <param name="xmlClassId" type="String">String. A class identifier to use when saving and loading objects of the specified type to and from XML.</param>
	/// <param name="jsonClassId" type="String">String. A class identifier to use when saving and loading objects of the specified type to and from JSON.</param>
	/// <param name="classVersion" type="Number">Number. A revision number of the objects's class serialization format.</param>
};

MindFusion.Scheduling.Selection.prototype = {
	clear: function() {
		/// <summary>Clears the selection.</summary>
	},
	copyFrom: function(settings) {
		/// <summary>Copies property values from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	},
	getRange: function() {
		/// <summary>Gets the selection range.</summary>
		/// <returns type="TimeRange">The selected TimeRange.</returns>
	},
	isEmpty: function() {
		/// <summary>Checks if the selection is empty.</summary>
		/// <returns type="Boolean">Boolean. true if the selection is empty; otherwise false.</returns>
	},
	setRange: function(start, end, resource) {
		/// <summary>Sets the selection range.</summary>
		/// <param name="start" type="DateTime">DateTime. A DateTime that specifies the&#160;start time of the selection.</param>
		/// <param name="end" type="DateTime" optional="true">Optional. DateTime. Specifies the end time of the selection.</param>
		/// <param name="resource" type="Resource" optional="true">Optional. Resource. The associated resource.</param>
	}
};
MindFusion.Scheduling.Selection.__class = true;

MindFusion.Scheduling.SelectionEventArgs.prototype = {
};
MindFusion.Scheduling.SelectionEventArgs.__class = true;

MindFusion.Scheduling.Task.prototype = {
	fromJson: function(json) {
		/// <summary>Deserializes this task from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
	},
	fromJson: function(json, context) {
		/// <summary>Deserializes this Task from a JSON string.</summary>
		/// <param name="json" type="String">String. A string created by the toJson method.</param>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
	},
	loadFromXml: function(element, context) {
		/// <summary>Loads the task content from an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that contains the task's serialized content.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	saveToXml: function(element, context) {
		/// <summary>Saves the Task content into an XML element.</summary>
		/// <param name="element" type="Element">Element. An XML DOM element that will contain the task's data.</param>
		/// <param name="context" type="XmlPersistContext">XmlPersistContext. An object providing contextual information about the serialization process and some helper serialization methods.</param>
	},
	toJson: function(context) {
		/// <summary>Serializes this task into a JSON string.</summary>
		/// <param name="context" type="JsonPersistContext">JsonPersistContext. The serialization context.</param>
		/// <returns type="String">String. A string containing the task's JSON representation.</returns>
	},
};
MindFusion.Scheduling.Task.__class = true;

MindFusion.Scheduling.TaskEventArgs.prototype = {
};
MindFusion.Scheduling.TaskEventArgs.__class = true;

MindFusion.Scheduling.TaskPriority = {
		/// <summary>Specifies the priority of a task.</summary>
		/// <field name="High">Indicates high task priority.</field>
		/// <field name="Low">Indicates low task priority.</field>
		/// <field name="Normal">Indicates normal task priority.</field>
	High: 2,
	Low: 0,
	Normal: 1
}
MindFusion.Scheduling.TaskPriority.__enum = true;

MindFusion.Scheduling.TaskStatus = {
		/// <summary>Specifies status values for a task.</summary>
		/// <field name="Completed">Indicates a completed task.</field>
		/// <field name="Deferred">Indicates a deferred task.</field>
		/// <field name="InProgress">Indicates a task in progress.</field>
		/// <field name="NotStarted">Indicates that the task has not started yet.</field>
		/// <field name="WaitingOther">Indicates a task that depends on another task.</field>
	Completed: 2,
	Deferred: 4,
	InProgress: 1,
	NotStarted: 0,
	WaitingOther: 3
}
MindFusion.Scheduling.TaskStatus.__enum = true;

MindFusion.Scheduling.TimelineSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies property values for this TimelineSettings object from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.TimelineSettings.__class = true;

MindFusion.Scheduling.TimeRange.prototype = {
	contains: function(range) {
		/// <summary>Checks if the current range contains the specified range.</summary>
		/// <param name="range" type="TimeRange">TimeRange. The range of DateTime values to check.</param>
		/// <returns type="Boolean">Boolean. true if the current range contains the specified range; otherwise false.</returns>
	},
	equals: function(range) {
		/// <summary>Checks if the specified range contains the same date-time as the current instance.</summary>
		/// <param name="range" type="TimeRange">TimeRange. The range of DateTime values to check.</param>
		/// <returns type="Boolean">Boolean. true if the ranges are equal; otherwise false.</returns>
	},
	intersects: function(range) {
		/// <summary>Checks if the current range intersects with the specified range.</summary>
		/// <param name="range" type="TimeRange">TimeRange. The range of DateTime values to check.</param>
		/// <returns type="Boolean">Boolean. true if the current range intersects with the specified range; otherwise false.</returns>
	},
	sameEnd: function(range) {
		/// <summary>Checks if the current range ends at the same time as the specified range.</summary>
		/// <param name="range" type="TimeRange">TimeRange. The range of DateTime values to compare to.</param>
		/// <returns type="Boolean">Boolean. true if the current range ends at the same time with the specified range; otherwise false.</returns>
	},
	sameStart: function(range) {
		/// <summary>Checks if the current range starts at the same time as the specified range.</summary>
		/// <param name="range" type="TimeRange">TimeRange. The range of DateTime values to compare to.</param>
		/// <returns type="Boolean">Boolean. true if the current range starts at the same time with the specified range; otherwise false.</returns>
	}
};
MindFusion.Scheduling.TimeRange.__class = true;

MindFusion.Scheduling.TimeSpan.prototype = {
	add: function(timespan) {
		/// <summary>Returns a new TimeSpan object whose value is the sum of the specified TimeSpan object and this instance.</summary>
		/// <param name="timespan" type="TimeSpan">TimeSpan. The TimeSpan object to add.</param>
		/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
	},
	clone: function() {
		/// <summary>Creates a copy of the time span.</summary>
		/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
	},
	equals: function(timespan) {
		/// <summary>Checks if the time span object represents the same time value as the current instance.</summary>
		/// <param name="timespan" type="TimeSpan">TimeSpan. The TimeSpan to check.</param>
		/// <returns type="Boolean">Boolean. True if the time spans represent the same time value, otherwise false.</returns>
	},
	subtract: function(timespan) {
		/// <summary>Returns a new TimeSpan object whose value is the difference between the specified TimeSpan object and this instance.</summary>
		/// <param name="timespan" type="TimeSpan">TimeSpan. The TimeSpan object to subtract.</param>
		/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
	}
};
MindFusion.Scheduling.TimeSpan.__class = true;

MindFusion.Scheduling.TimeSpan.fromDays = function(days) {
	/// <summary>Returns a TimeSpan that represents a specified number of days.</summary>
	/// <param name="days" type="Number">Number. The number of days.</param>
	/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
};
MindFusion.Scheduling.TimeSpan.fromHours = function(hours) {
	/// <summary>Returns a TimeSpan that represents a specified number of hours.</summary>
	/// <param name="hours" type="Number">Number. The number of hours.</param>
	/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
};
MindFusion.Scheduling.TimeSpan.fromMilliseconds = function(milliseconds) {
	/// <summary>Returns a TimeSpan that represents a specified number of milliseconds.</summary>
	/// <param name="milliseconds" type="Number">Number. The number of milliseconds.</param>
	/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
};
MindFusion.Scheduling.TimeSpan.fromMinutes = function(minutes) {
	/// <summary>Returns a TimeSpan that represents a specified number of minutes.</summary>
	/// <param name="minutes" type="Number">Number. The number of minutes.</param>
	/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
};
MindFusion.Scheduling.TimeSpan.fromSeconds = function(seconds) {
	/// <summary>Returns a TimeSpan that represents a specified number of seconds.</summary>
	/// <param name="seconds" type="Number">Number. The number of seconds.</param>
	/// <returns type="TimeSpan">TimeSpan. The resulting time span.</returns>
};

MindFusion.Scheduling.TimetableSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies property values for this TimetableSettings instance&#160;from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.TimetableSettings.__class = true;

MindFusion.Scheduling.TimeUnit = {
		/// <summary>Specifies a time resolution.</summary>
		/// <field name="Day">Specifies days.</field>
		/// <field name="Hour">Specifies hours.</field>
		/// <field name="Minute">Specifies minutes.</field>
		/// <field name="Month">Specifies months.</field>
		/// <field name="Second">Specifies seconds.</field>
		/// <field name="Week">Specifies weeks.</field>
		/// <field name="Year">Specifies years.</field>
	Day: 3,
	Hour: 2,
	Minute: 1,
	Month: 5,
	Second: 0,
	Week: 4,
	Year: 6
}
MindFusion.Scheduling.TimeUnit.__enum = true;

MindFusion.Scheduling.VerticalHeaderStyle = {
		/// <summary>Specifies the appearance of a vertical header in the calendar.</summary>
		/// <field name="Left">The header is displayed to the left side of the calendar.</field>
		/// <field name="None">The header is not displayed.</field>
		/// <field name="Right">The header is displayed to the right side of the calendar.</field>
	Left: 1,
	None: 0,
	Right: 2
}
MindFusion.Scheduling.VerticalHeaderStyle.__enum = true;

MindFusion.Scheduling.ViewCell.prototype = {
};
MindFusion.Scheduling.ViewCell.__class = true;

MindFusion.Scheduling.WeekRangeSettings.prototype = {
	copyFrom: function(settings) {
		/// <summary>Copies the property values for this WeekRangeSettings instance from another object.</summary>
		/// <param name="settings" type="Object">Object. An object containing property values.</param>
	}
};
MindFusion.Scheduling.WeekRangeSettings.__class = true;

MindFusion.Scheduling.WeekRangeViewStyle = {
		/// <summary>Specifies whether there are multiple weeks displayed in WeekRange view.</summary>
		/// <field name="SingleWeek">The calendar view displays a single week at a time.</field>
		/// <field name="WeekPerRow">The calendar view displays several weeks at a time.</field>
	SingleWeek: 1,
	WeekPerRow: 0
}
MindFusion.Scheduling.WeekRangeViewStyle.__enum = true;

MindFusion.Scheduling.XmlPersistContext.prototype = {
	addChildElement: function(elementName, parentElement, innerText) {
		/// <summary>Adds a new child node with the specified name and value to the specified parent node.</summary>
		/// <param name="elementName" type="String">String. A string containing the name of new child element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <param name="innerText" type="String" optional="true">Optional. String. Optional value to be added as child text node of the new element.</param>
		/// <returns type="Element">Element. The newly created DOM Element object.</returns>
	},
	readBool: function(elementName, parentElement, defaultValue) {
		/// <summary>Reads a Boolean value with the specified name.</summary>
		/// <param name="elementName" type="String">String. A string specifying the name of the Boolean XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <param name="defaultValue" type="Boolean" optional="true">Optional. Boolean. The default value to return if specified child XML element does not exist.</param>
		/// <returns type="Boolean">Boolean. The value loaded from XML.</returns>
	},
	readDateTime: function(elementName, parentElement, defaultValue) {
		/// <summary>Reads a DateTime value with the specified name.</summary>
		/// <param name="elementName" type="String">String. A string specifying the name of the DateTime XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <param name="defaultValue" type="Boolean" optional="true">Optional. Boolean. The default value to return if specified child XML element does not exist.</param>
		/// <returns type="Boolean">DateTime. The value loaded from XML.</returns>
	},
	readFloat: function(elementName, parentElement, defaultValue) {
		/// <summary>Reads a floating-point number with the specified name.</summary>
		/// <param name="elementName" type="String">String. A string specifying the name of the number XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <param name="defaultValue" type="Number" optional="true">Optional. Number. The default number to return if specified child XML element does not exist.</param>
		/// <returns type="Number">Number. The number loaded from XML.</returns>
	},
	readInt: function(elementName, parentElement, defaultValue) {
		/// <summary>Reads an integer number with the specified name.</summary>
		/// <param name="elementName" type="String">String. A string specifying the name of the number XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <param name="defaultValue" type="Number" optional="true">Optional. Number. The default number to return if specified child XML element does not exist.</param>
		/// <returns type="Number">Number. The number loaded from XML.</returns>
	},
	readRecurrence: function(elementName, parentElement) {
		/// <summary>Reads a Recurrence object with the specified name.</summary>
		/// <param name="elementName" type="String">String. A string specifying the name of the Recurrence XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <returns type="Recurrence">Recurrence. The Recurrence object read; null if reading has failed.</returns>
	},
	readReminder: function(elementName, parentElement) {
		/// <summary>Reads a Reminder object with the specified name.</summary>
		/// <param name="elementName" type="String">String. A string specifying the name of the Reminder XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <returns type="Reminder">Reminder. The Reminder object read; null if reading has failed.</returns>
	},
	readString: function(elementName, parentElement, defaultValue) {
		/// <summary>Reads a string value with the specified name.</summary>
		/// <param name="elementName" type="String">String. The name of the string's XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <param name="defaultValue" type="Object" optional="true">Optional. Object. The default string to return if specified child XML element does not exist.</param>
		/// <returns type="String">String. The string loaded from XML.</returns>
	},
	writeBool: function(boolValue, elementName, parentElement) {
		/// <summary>Writes a Boolean value with the specified name.</summary>
		/// <param name="boolValue" type="Boolean">Boolean. The Boolean value that should be saved in current XML document.</param>
		/// <param name="elementName" type="String">String. A string specifying the name of the new element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <returns type="Element">Element. The newly created DOM Element object.</returns>
	},
	writeDateTime: function(dateTimeValue, elementName, parentElement) {
		/// <summary>Writes a DateTime value with the specified name.</summary>
		/// <param name="dateTimeValue" type="DateTime">DateTime. The DateTime value that should be saved in current XML document.</param>
		/// <param name="elementName" type="String">String. A string specifying the name of the new element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <returns type="Element">Element. The newly created DOM Element object.</returns>
	},
	writeFloat: function(floatValue, elementName, parentElement) {
		/// <summary>Writes a floating-point number with the specified name.</summary>
		/// <param name="floatValue" type="Number">Number. The number that should be saved in current XML document.</param>
		/// <param name="elementName" type="String">String. A string specifying the name of the new element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <returns type="Element">Element. The newly created DOM Element object.</returns>
	},
	writeInt: function(intValue, elementName, parentElement) {
		/// <summary>Writes an integer number with the specified name.</summary>
		/// <param name="intValue" type="Number">Number. The number that should be saved in current XML document.</param>
		/// <param name="elementName" type="String">String. A string specifying the name of the new element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <returns type="Element">Element. The newly created DOM Element object.</returns>
	},
	writeRecurrence: function(The, elementName, parentElement) {
		/// <summary>Writes the specified Recurrence object as an XML element with the specified name and the specified parent.</summary>
		/// <param name="The" type="Recurrence">Recurrence. The Recurrence object to write.</param>
		/// <param name="elementName" type="String">String. A string specifying the name of the Recurrence XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
	},
	writeReminder: function(The, elementName, parentElement) {
		/// <summary>Writes the specified Reminder object as an XML element with the specified name and the specified parent.</summary>
		/// <param name="The" type="Reminder">Reminder. The Reminder object to write.</param>
		/// <param name="elementName" type="String">String. A string specifying the name of the Reminder XML element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
	},
	writeString: function(stringValue, elementName, parentElement) {
		/// <summary>Writes a string value with the specified name.</summary>
		/// <param name="stringValue" type="String">String. The string that should be saved in current XML document.</param>
		/// <param name="elementName" type="String">String. A string specifying the name of the new element.</param>
		/// <param name="parentElement" type="Element">Element. The parent DOM Element object.</param>
		/// <returns type="Element">Element. The newly created DOM Element object.</returns>
	}
};
MindFusion.Scheduling.XmlPersistContext.__class = true;

MindFusion.Scheduling.YearlyRecurrence = {
		/// <summary>Specifies types of yearly recurrence patterns.</summary>
		/// <field name="ByDayType">The event occurs on a specific type of day of the specified week and month of the year.</field>
		/// <field name="SpecificDate">The event occurs on a specific date of the year.</field>
	ByDayType: 1,
	SpecificDate: 0
}
MindFusion.Scheduling.YearlyRecurrence.__enum = true;
