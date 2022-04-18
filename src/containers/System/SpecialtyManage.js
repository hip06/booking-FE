import React, { Component } from 'react';
import { connect } from 'react-redux';
import './specialty-manage.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import swal from 'sweetalert';
import _ from 'lodash';
import GetBase64 from '../../utils/getBase64';
import { createSpecialty } from '../../services/userServices'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class SpecialtyManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSpecialty: null,
            image: null,
            descriptionHTML: '',
            descriptionMarkdown: '',

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
        let validate = this.validate(['nameSpecialty', 'image', 'descriptionHTML', 'descriptionMarkdown'])
        if (!validate) {
            let response = await createSpecialty(this.state)
            console.log(response);
            if (response && response.data && response.data.errCode === 0) {
                swal('Done!', `Create new specialty succeed`, 'success')
                this.setState({
                    nameSpecialty: '',
                    image: null,
                    descriptionHTML: '',
                    descriptionMarkdown: ''
                })
            } else {
                swal('Ops!', `Something was wrong...[${response.data.message}]`, 'error')
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
            <div className='specialty-manage-container'>
                <h2 className='text-center my-5'>Specialty Manage</h2>
                <div className="content-spec px-5">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Name of specialty: </label>
                            <input type="text" value={this.state.nameSpecialty} onChange={event => this.handleChangeInput(event, 'nameSpecialty')} className='form-control' />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Avatar</label>
                            <input type="file" onChange={(event) => this.handleChangeFile(event)} className='form-control' />

                        </div>
                        {this.state.image && <div className="preview-img col-3"><img src={this.state.image} alt="avatar" /></div>}
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
