//排序所有的文章
export const sortPosts = (allPosts: any) => {
    return allPosts.sort((a, b) => {
        return (
            parseInt(b.url.split('/posts/')[1].split('-')[0]) -
            parseInt(a.url.split('/posts/')[1].split('-')[0])
        );
    });
}
