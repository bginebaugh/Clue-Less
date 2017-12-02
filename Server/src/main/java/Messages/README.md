# About
The messages classes defined in this directory should be used with Google's GSON library for easy serialization/deserialization.

#TODO stuff
In order to have the desired nested message functionality with header --> other content, we will need a custom JsonDeserializer.
This class should be implemented so that it parses the header, and creates the correct Message Object based on the messageType field in the header.
See this link: https://stackoverflow.com/questions/23070298/get-nested-json-object-with-gson-using-retrofit

