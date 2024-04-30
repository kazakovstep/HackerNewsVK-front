import {useGetNewsItemByIdQuery} from "../../entities/news";
import {Comment} from "../Comment/Comment"
import {Button} from "@vkontakte/vkui";

const CommentsTree = ({newsId}: { newsId: number }) => {
    const {data: news, refetch} = useGetNewsItemByIdQuery(newsId);

    return (
        <div>
            {news?.kids ?
                <Button appearance={"accent-invariable"} onClick={() => refetch()}>Обновить комментарии</Button> : null}
            {news?.kids?.map((commentId) => (
                <Comment key={commentId} id={commentId}/>
            ))}
        </div>
    );
};

export default CommentsTree;