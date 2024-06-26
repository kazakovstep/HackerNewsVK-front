import {useGetNewsItemsQuery} from "../../entities/news";
import {Button, Div} from "@vkontakte/vkui";
import React, {useEffect} from "react";
import NewsPreview from "../../entities/news/ui";
import Loading from "../../shared/Loading/Loading";
import styles from "../../app/styles/news.module.css"
import {useDispatch} from "react-redux";
import {actions as kidsActions} from "../../app/store/slices/kidsSlice.slice"

export default function News() {
    const {data: news, isFetching, error, refetch} = useGetNewsItemsQuery();

    useEffect(() => {
        const intervalId = setInterval(() => {
            window.location.reload();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(kidsActions.clearDeleted())
    }, []);

    if (isFetching) return <Loading/>;

    if (error) return <Div>Ошибка: {error?.toString()}</Div>;

    return (
        <Div>
            <Button appearance={"accent"} onClick={() => refetch()} className={styles.refetchButton}>Обновить
                новости</Button>
            {news?.map((item) => (
                <NewsPreview item={item}></NewsPreview>
            ))}
        </Div>
    );
}