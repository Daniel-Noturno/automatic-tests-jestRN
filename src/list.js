import React from 'react';
import { View, ScrollView, Text, Button, AsyncStorage } from 'react-native';

import Post from './Post';

export default class List extends React.Component {
    state = {
        posts: [],
    }

    async componentDidMount() {
        const posts = JSON.parse(await AsyncStorage.getItem('@TestRN:posts') || []);
        this.setState({ posts });
    }

    renderPosts = () => (
        <ScrollView>
            { this.state.posts.map(post => <Post key={post.id} post={post} onDelete={this.deletePost}/>) }
        </ScrollView>
    )

    addPost = () => {
        this.setState({
            posts: [
                ...this.state.posts,
                { id: Math.random(),title: "Post aleatório", description: "Teste de descrição" },
            ],
        });
    }

    deletePost = (id) => {
        this.setState({
            posts: this.state.posts.filter(post => post.id !== id),
        });
    }

    savePost = async () => {
        await AsyncStorage.setItem('@TestRN:posts', JSON.stringify(this.state.posts));
    }

    render() {
        return (
            <View>
                {
                    this.state.posts.length > 0 
                    ? this.renderPosts() 
                    : <Text>Nenhum post</Text>
                }
                <Button id="new" title={"Add post"} onPress={this.addPost}/>
                <Button id="save" title={"Save posts"} onPress={this.savePost}/>
            </View>
        );
    }
}
