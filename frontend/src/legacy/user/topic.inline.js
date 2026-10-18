
  let isBookmarked = false;
  function toggleBookmark() {
    isBookmarked = !isBookmarked;
    const btn = document.getElementById('btn-bookmark');
    if (isBookmarked) {
      btn.innerHTML = '<i class="bi bi-bookmark-fill text-primary"></i> Bookmarked';
      Toast.success('Topic saved to your bookmarks library', 'Bookmark Added');
    } else {
      btn.innerHTML = '<i class="bi bi-bookmark"></i> Bookmark Topic';
      Toast.info('Bookmark removed', 'Bookmarks Updated');
    }
  }
