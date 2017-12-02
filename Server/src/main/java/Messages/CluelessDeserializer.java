package Messages;

import java.lang.reflect.Type;

import com.google.gson.*;

public class CluelessDeserializer implements JsonDeserializer<MessageBase> {
	@Override
	public MessageBase deserialize(JsonElement je, Type type, JsonDeserializationContext jdc) throws JsonParseException
	{
		String messageType = je.getAsJsonObject().get("messageType").getAsString();
		MessageBase obj = null;
		Gson gson = new Gson();
		JsonElement message = je.getAsJsonObject().get("message");

		switch (messageType) {
			case "loginMessage":
				obj = gson.fromJson(message, LoginMessage.class);
				break;
			default:
				System.out.println("This message sucks and isn't allows");
				break;
		}
		
		return obj;
	}
}
