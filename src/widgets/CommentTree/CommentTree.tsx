import {useGetNewsItemByIdQuery} from "../../entities/news";
import {Comment} from "../../entities/comment/ui"
import {Button, Div} from "@vkontakte/vkui";
import React from "react";
import Loading from "../../shared/Loading/Loading";

const CommentsTree = ({newsId}: { newsId: number }) => {
    const {data: news, isFetching, refetch} = useGetNewsItemByIdQuery(newsId);

    if (isFetching) return <Loading/>;

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