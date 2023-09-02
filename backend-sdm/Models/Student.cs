using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Student
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _id { get; set; }

    public string name { get; set; }
    public int age { get; set; }
    public string grade { get; set; }

    public Student()
    {
        // Set default values for non-nullable properties
        _id = ObjectId.GenerateNewId().ToString();
        name = string.Empty;
        age = 0;
        grade = string.Empty;
    }
}