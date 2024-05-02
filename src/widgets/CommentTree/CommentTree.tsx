import {NewsItem, useGetNewsItemByIdQuery} from "../../entities/news";
import {Comment} from "../../entities/comment/ui"
import {Button, Div} from "@vkontakte/vkui";
import React from "react";
import Loading from "../../shared/Loading/Loading";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store/store";

const CommentsTree = ({newsId}: { newsId: number }) => {
    const {data: news, isFetching, refetch} = useGetNewsItemByIdQuery(newsId);

    const isDeleted = useSelector((state: RootState) => state.kids.deleted)
    console.log(isDeleted)

    if (isFetching) return <Loading/>;

    return (
        <Div>
            {news?.kids && isDeleted.includes(false) ?
                <Button appearance={"accent-invariable"} onClick={() => refetch()}>Обновить комментарии</Button> : null}
            {news?.kids?.map((commentId) => (
                <Comment key={commentId} id={commentId}/>
            ))}
        </Div>
    );
};

export default CommentsTree;