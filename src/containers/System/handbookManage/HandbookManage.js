import React, { Component } from 'react';
import { connect } from 'react-redux';
import './handbookManage.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import swal from 'sweetalert';
import _ from 'lodash';
import GetBase64 from '../../../utils/getBase64';
import { createHandbookService } from '../../../services/adminService'
import markdownItAttrs from 'markdown-it-attrs'
import { push } from 'connected-react-router';


const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.use(markdownItAttrs, {
    // optional, these are default options
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []  // empty array = all attributes are allowed
})

class HankbookManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: null,
            descriptionHTML: '',
            descriptionMarkdown: '',
            createdAt: null,
            updatedAt: null,
            author: null

        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
        // console.log('handleEditorChange', html, text);
    }
    handleChangeInput = (event, id) => {
        this.setState({
            [id]: event.target.value,

        })
    }
    handleChangeFile = async (event) => {
        let imgLinkBase64 = await GetBase64.toBase64(event.target.files[0])
        this.setState({
            image: imgLinkBase64
        })
    }
    handleSave = async () => {
        let validate = this.validate(['title', 'image', 'descriptionHTML', 'descriptionMarkdown', 'createdAt', 'updatedAt', 'author'])
        if (!validate) {
            // console.log(this.state);
            let response = await createHandbookService({
                ...this.state,
                postId: Math.floor(Math.random() * Math.pow(10, 6))
            })
            if (response && response.data.errCode === 0) {
                swal('Done!', `Create succeed`, 'success')
                this.setState({
                    title: '',
                    image: null,
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    createdAt: null,
                    updatedAt: null,
                    author: null
                })
            } else {
                swal('Ops!', `Some things not right`, 'error')
            }
        } else {
            swal('Ops!', `Missing somethings...[${validate}]`, 'warning')
        }

    }
    validate = (validatedFields) => {
        let checkValidate = null
        for (let i = 0; i < validatedFields.length; i++) {
            if (!this.state[validatedFields[i]]) {
                checkValidate = validatedFields[i]
                break
            }
        }
        return checkValidate
    }

    render() {


        return (
            <div className='handbook-manage-container'>
                <h2 className='text-center my-5'>Handbook Manage</h2>
                <div className="content-handbook">
                    <div className="row">
                        <div className="title-handbook col-4">
                            <label htmlFor="">Title</label>
                            <input type="text" value={this.state.title} onChange={(event) => this.handleChangeInput(event, 'title')} className='form-control' />
                        </div>
                        <div className="image-handbook col-4">
                            <label htmlFor="">avatar</label>
                            <input type="file" onChange={(event) => this.handleChangeFile(event)} className='form-control' />
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="creatAt-handbook col-4">
                            <label htmlFor="">CreatedAt</label>
                            <input type="text" value={this.state.createdAt} onChange={(event) => this.handleChangeInput(event, 'createdAt')} className='form-control' />
                        </div>
                        <div className="updateAt-handbook col-4">
                            <label htmlFor="">UpdatedAt</label>
                            <input type="text" value={this.state.updatedAt} onChange={(event) => this.handleChangeInput(event, 'updatedAt')} className='form-control' />
                        </div>
                        <div className="author-handbook col-4">
                            <label htmlFor="">Author</label>
                            <input type="text" value={this.state.author} onChange={(event) => this.handleChangeInput(event, 'author')} className='form-control' />
                        </div>
                    </div>
                    <MdEditor
                        value={this.state.descriptionMarkdown}
                        style={{ height: '500px', margin: '32px 0' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                    <button type='button' onClick={() => this.handleSave()} className='btn btn-primary px-3'>Save</button>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        negative: (path) => dispatch(push(path))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HankbookManage);
