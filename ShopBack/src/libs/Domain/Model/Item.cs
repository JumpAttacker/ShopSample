using System.ComponentModel.DataAnnotations;

namespace Domain.Model
{
    public class Item
    {
        [Key] public int Id { get; set; }

        [MaxLength(50)] [MinLength(5)] public string Name { get; set; }

        [MaxLength(200)] public string Description { get; set; }

        [Range(1, int.MaxValue)] public int Price { get; set; }
    }
}