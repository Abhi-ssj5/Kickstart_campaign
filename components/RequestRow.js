import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {

    state = {
        approveLoading: false,
    }

    onApprove = async () => {
        const campaign = Campaign(this.props.address);

        this.setState({approveLoading: true})

        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
    
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            console.log(err.message);
        }
        
        this.setState({approveLoading: false})
    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);


        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
        //Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        
    }

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell><Button color="green" basic onClick={this.onApprove} loading={this.state.approveLoading}>Approve</Button></Cell>
                <Cell><Button color="teal" basic onClick={this.onFinalize}>Finalize</Button></Cell>
            </Row>
        );
    }
}

export default RequestRow;