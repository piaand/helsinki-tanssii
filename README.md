# Helsinki tanssii
My current work in progress. Small React + Spring project to better visualize [My Helsinki](https://www.myhelsinki.fi/fi/search) dance event data.

You may check the project live [here](https://radiant-fortress-33636.herokuapp.com/) at Heroku. It may take a while before the site is up - see the screenshots [here](./documentation/screenshots.md) if you are too eager to wait.

![Helsinki tanssii banner by Akshar Dave on Unsplash](./documentation/HelsinkiTanssii-banner.png)

## Description
City of Helsinki has an [open API](http://open-api.myhelsinki.fi/) for all the events happening in Helsinki and capital area of Finland. API is used to power the [event search](https://www.myhelsinki.fi/fi/n%C3%A4e-ja-koe/tapahtumat) which I often use to find dance related events to attend to. With this project I use the API to create bit more simplified query tool to focus on gathering events related solely on dance.

### My app tries to solve following things:

1. Bring content first by changing the data structure and presentation of event data.
- In the API provided data (and My Helsinki service) unique event is a specific event with a unique date. So when searching "Swanlake" the ballet user gets several search hits for the keyword depending on how many days the ballet is presenting (as writing this there were +10 different dates)
- This means that when querying events search result is populated with several hits from big event providers (such as Opera Ballet) and smaller production groups get less visibility which may present their piece once or twice
- In my application data is parsed so that unique event has unique content (name, description, etc) - however one event may have several event dates. This means Swanlake the ballet would be found only once.

2. Make the layout more simple and focused on fast search
- Since there are less events I wanted to simplify the way they are searched: event is found either by text search or date restrictions
- React fetches the data from API or locale storage only once at the beginning of opening the browser. Search results and showing the events are done at the client side
- TODO: currently search is based on name (Finnish, English or Swedish one) - next search should be expanded to tags and descriptions

3. Give user option to search events between dates in addition to specific day
- it is hard to find dance events for every day of the month (especially now in winter 2021) - therefore it makes more sence to give the option to user to find events within the timeline of their choosing
- TODO: currently app has only filters for "today" and "tomorrow" - next, a calendar view and options to add two dates should be allowed

Java Spring backend is used as a middleware to overcome some CORS policy issues. I wanted to focus more on the frontend side build for learning purposes.
