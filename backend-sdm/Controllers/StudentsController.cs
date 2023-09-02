using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly IMongoCollection<Student> _studentsCollection;

    public StudentsController(IMongoClient mongoClient)
    {
        var database = mongoClient.GetDatabase("project");
        _studentsCollection = database.GetCollection<Student>("students");
    }

    [HttpGet]
    public async Task<IEnumerable<Student>> Get()
    {
        var students = await _studentsCollection.Find(student => true).ToListAsync();
        return students;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Student student)
    {
        await _studentsCollection.InsertOneAsync(student);
        return Ok(student);
    }

    [HttpPut("{_id}")]
    public async Task<IActionResult> Put(string _id, Student student)
    {
        var filter = Builders<Student>.Filter.Eq(s => s._id, _id);
        var update = Builders<Student>.Update
            .Set(s => s.name, student.name)
            .Set(s => s.age, student.age)
            .Set(s => s.grade, student.grade);

        await _studentsCollection.UpdateOneAsync(filter, update);
        return Ok(student);
    }

    [HttpDelete("{_id}")]
    public async Task<IActionResult> Delete(string _id)
    {
        await _studentsCollection.DeleteOneAsync(student => student._id == _id);
        return NoContent();
    }
}