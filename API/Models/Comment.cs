using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        
        [ForeignKey("Stock")]
        public int? StockId { get; set; }
        public Stock? Stock { get; set; }
    }
}