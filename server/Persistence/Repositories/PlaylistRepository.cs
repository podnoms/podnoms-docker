using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PodNoms.Api.Models;

namespace PodNoms.Api.Persistence {
    public interface IPlaylistRepository : IRepository<Playlist> {
        Task<ParsedPlaylistItem> GetParsedItem(string itemId, int playlistId);
        Task<List<ParsedPlaylistItem>> GetUnprocessedItems();
    }
    public class PlaylistRepository : GenericRepository<Playlist>, IPlaylistRepository {
        public PlaylistRepository(PodNomsDbContext context) : base(context) {
        }

        public async Task<ParsedPlaylistItem> GetParsedItem(string itemId, int playlistId) {
            return await GetContext().ParsedPlaylistItems
                .Include(i => i.Playlist)
                .Include(i => i.Playlist.Podcast)
                .Include(i => i.Playlist.Podcast.AppUser)
                .SingleOrDefaultAsync(i => i.VideoId == itemId && i.PlaylistId == playlistId);
        }
        public async Task<List<ParsedPlaylistItem>> GetUnprocessedItems() {
            return await GetContext().ParsedPlaylistItems
                .Where(p => p.IsProcessed == false)
                .Include(i => i.Playlist)
                .Include(i => i.Playlist.Podcast)
                .Include(i => i.Playlist.Podcast.AppUser)
                .ToListAsync();
        }
    }
}