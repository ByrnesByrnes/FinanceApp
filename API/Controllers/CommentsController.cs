using API.Dtos.Comment;
using API.interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;
        private readonly IMapper _mapper;

        public CommentsController(ICommentRepository commentRepository, IStockRepository stockRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var comments = await _commentRepository.GetAllAsync();

            var commentDtos = _mapper.Map<IEnumerable<CommentDto>>(comments);

            return Ok(commentDtos);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var comment = await _commentRepository.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            var commentDto = _mapper.Map<CommentDto>(comment);

            return Ok(commentDto);
        }

        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> Create([FromRoute] int stockId, [FromBody] CreateCommentRequestDto createCommentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (!await _stockRepository.StockExist(stockId))
            {
                return BadRequest("Stock does not exist");
            }

            var comment = _mapper.Map<Comment>(createCommentDto);

            comment.StockId = stockId;

            _commentRepository.Add(comment);

            var result = await _commentRepository.SaveChanges();

            if (!result)
            {
                return BadRequest(new ProblemDetails { Title = "Could Not Save Comment" });
            }

            var commentDto = _mapper.Map<CommentDto>(comment);

            return CreatedAtAction(nameof(GetById), new { Id = commentDto.Id }, commentDto);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateCommentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var comment = await _commentRepository.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound("Comment Not Found");
            }

            comment.Title = updateCommentDto.Title;
            comment.Content = updateCommentDto.Content;
            comment.UpdatedOn = DateTime.Now;
            comment.Edited = true;

            var result = await _commentRepository.SaveChanges();
            if (!result)
            {
                return BadRequest(new ProblemDetails { Title = "Unable to Update Comment." });
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var comment = await _commentRepository.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            _commentRepository.Delete(comment);

            var result = await _commentRepository.SaveChanges();

            if (!result)
            {
                return BadRequest(new ProblemDetails { Title = "Could not Delete Comment" });
            }

            return NoContent();
        }
    }
}