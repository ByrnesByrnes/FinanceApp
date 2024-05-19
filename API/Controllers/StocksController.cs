using API.Dots.Stock;
using API.interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/stock")]
    public class StocksController : ControllerBase
    {
        private readonly IStockRepository _stockRepository;
        private readonly IMapper _mapper;
        public StocksController(IStockRepository stockRepository, IMapper mapper)
        {
            _stockRepository = stockRepository;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var stocks = await _stockRepository.GetAllAsync();

            var stocksDto = _mapper.Map<IEnumerable<StockDto>>(stocks);

            return Ok(stocksDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var stock = await _stockRepository.GetByIdAsync(id);

            var stockDto = _mapper.Map<StockDto>(stock);

            if (stockDto == null)
            {
                return NotFound();
            }

            return Ok(stockDto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto createStock)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var stock = _mapper.Map<Stock>(createStock);

            _stockRepository.Add(stock);

            var result = await _stockRepository.SaveChanges();

            if (!result)
            {
                return BadRequest(result);
            }

            var stockDto = _mapper.Map<StockDto>(stock);

            return CreatedAtAction(nameof(GetById), new { Id = stockDto.Id }, stockDto);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var stock = await _stockRepository.GetByIdAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            stock.Symbol = updateDto.Symbol;
            stock.CompanyName = updateDto.CompanyName;
            stock.Purchase = updateDto.Purchase;
            stock.LastDiv = updateDto.LastDiv;
            stock.Industry = updateDto.Industry;
            stock.MarketCap = updateDto.MarketCap;

            var result = await _stockRepository.SaveChanges();

            if (!result)
            {
                return BadRequest(result);
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var stock = await _stockRepository.GetByIdAsync(id);

            if (stock == null)
            {
                return NotFound();
            }

            _stockRepository.Delete(stock);
            var result = await _stockRepository.SaveChanges();

            if (!result)
            {
                return BadRequest(result);
            }

            return NoContent();
        }
    }
}