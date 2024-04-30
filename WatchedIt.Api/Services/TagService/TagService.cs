using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.TagModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.TagService
{
    public class TagService : ITagService
    {
        private readonly WatchedItContext _context;
        public TagService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<GetTagsDto> GetAll()
        {
            var tags = await _context.Tags.OrderBy(t => t.Type).ThenBy(x => x.Name).ToListAsync();
            return TagMapper.MapAll(tags);
        }

        public async Task<GetTagDto> GetById(int id)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Id == id);
            if (tag is null) throw new NotFoundException($"Tag with Id '{id}' not found.");
            return TagMapper.Map(tag);
        }

        public async Task<GetTagDto> Add(AddTagDto newTag)
        {
            var tag = new Tag
            {
                Name = newTag.Name,
                Type = newTag.Type
            };
            await _context.Tags.AddAsync(tag);
            await _context.SaveChangesAsync();
            return TagMapper.Map(tag);
        }

        public async Task<GetTagDto> Update(int id, UpdateTagDto updatedTag)
        {
            var tag = await _context.Tags.FirstOrDefaultAsync(c => c.Id == id);
            if (tag is null) throw new NotFoundException($"Tag with Id '{id}' not found.");
            tag.Name = updatedTag.Name;
            tag.Type = updatedTag.Type;
            await _context.SaveChangesAsync();
            return TagMapper.Map(tag);
        }

        public void Delete(int id)
        {
            var tag = _context.Tags.FirstOrDefault(c => c.Id == id);
            if (tag is null) throw new NotFoundException($"Tag with Id '{id}' not found.");
            _context.Tags.Remove(tag);
            _context.SaveChanges();
            return;
        }
    }
}