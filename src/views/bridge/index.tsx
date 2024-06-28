import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationChangeNework } from "../../hooks/useMutationChangeNework";
import { useMutationBridgeTransfer } from "../../hooks/useMutationBridgeTransfer";
import { useQueryTokenBalance } from "../../hooks/useQueryTokenBalance";
import { useQueryNetworks } from "../../hooks/useQueryNetworks";
import { useQueryBridges } from "../../hooks/useQueryBridges";
import { IPoolv4 } from "../../types/entity.type";
import { useQueryMyWallet } from "../../hooks/useQueryMyWallet";
import * as Shared from "../../components/Shared";
import { styled } from "styled-components";
import { Layout, Col, Row, Modal } from "antd";
import DetailButton from "../detail/components/DetailButton";
import NetworkDropdown from "./components/NetworkDropdown";

export interface PoolDetailViewProps {
  pool: IPoolv4;
}

const BridgeView: React.FC = () => {
  const { data: myWalletData } = useQueryMyWallet();
  const {
    data: bridges,
    isLoading,
    isError,
  } = useQueryBridges(myWalletData ?? null);
  const changeNetwork = useMutationChangeNework();

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    if (bridges != null) {
      for (let i = 0; i < bridges.length; i++) {
        if (
          bridges[i].inToken.network.chainId === myWalletData?.networkChainId
        ) {
          setSelectedIdx(i);
          break;
        }
      }
    }
  }, [bridges]);

  const bridge = bridges?.[selectedIdx];

  const [amount, setAmount] = useState<number>(0);

  const expectAmount = Math.max(amount - (bridge?.feeFixed ?? 0), 0);

  const { data: inTokenBalance } = useQueryTokenBalance(
    bridge?.inToken.network ?? null,
    bridge?.inToken ?? null,
    myWalletData ?? null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickNetwork = async (idx: number) => {
    const bridge = bridges?.[idx];
    if (
      bridge != null &&
      myWalletData != null &&
      myWalletData.networkChainId !== bridge.inToken.network.chainId
    ) {
      await changeNetwork.mutate({
        network: bridge.inToken.network,
        wallet: myWalletData,
      });
    }
    setSelectedIdx(idx);
    setAmount(0);
  };

  const onSuccessTransfer = () => {
    alert("Bridge Transfer Success. Please wait for transaction to complete.");
    window.location.reload();
  };

  const onFailTransfer = () => {
    alert("Bridge Transfer Failed. Please try again.");
  };

  const bridgeTransfer = useMutationBridgeTransfer(
    onSuccessTransfer,
    onFailTransfer
  );

  const isEnabledTransfer =
    bridge != null &&
    amount > 0 &&
    amount >= bridge.minimum &&
    expectAmount > 0 &&
    !bridgeTransfer.isLoading;

  const onClickTransfer = async () => {
    if (bridge == null || myWalletData == null) {
      alert("Bridge or Wallet not found");
      return;
    }

    if (myWalletData.networkChainId !== bridge.inToken.network.chainId) {
      await changeNetwork.mutate({
        network: bridge.inToken.network,
        wallet: myWalletData,
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const onClickConfirmTransfer = async () => {
    if (bridge == null || myWalletData == null) {
      alert("Bridge or Wallet not found");
      return;
    }

    await bridgeTransfer.mutate({
      bridge,
      amount,
      wallet: myWalletData,
    });
  };

  if (isLoading) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Loading...
        </Shared.NhubTypo>
      </ViewWrap>
    );
  }
  if (isError) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Loading...
        </Shared.NhubTypo>
      </ViewWrap>
    );
  }
  if (myWalletData == null) {
    return (
      <ViewWrap>
        <Shared.NhubTypo type="bold" usage="nav">
          Wallet not found
        </Shared.NhubTypo>
      </ViewWrap>
    );
  }

  return (
    <Content.Layout id="bridge">
      <Content.Header>
        <Shared.NhubTypo
          type="bold"
          usage="subTitle"
          style={{ marginBottom: 30 }}
        >
          Nural Bridge
        </Shared.NhubTypo>
      </Content.Header>
      {bridges != null ? (
        <Content.Body>
          <Content.Row gutter={[0, 10]}>
            <Content.LeftCol span={24}>
              <Shared.NhubTypo type="regular" usage="bridge">
                From
              </Shared.NhubTypo>
              <NetworkDropdown
                networks={bridges.map((bridge) => bridge.inToken.network)}
                selectedIdx={selectedIdx}
                onClickItem={onClickNetwork}
              />
            </Content.LeftCol>
            <Content.LeftCol span={12}>
              <Shared.NhubTypo type="regular" usage="bridge">
                Token Balance
              </Shared.NhubTypo>
            </Content.LeftCol>
            {bridge != null ? (
              <>
                <Content.RightCol span={12}>
                  <Shared.NhubTypo type="regular" usage="bridge">
                    {inTokenBalance ?? 0} {bridge.inToken.symbol}
                  </Shared.NhubTypo>
                </Content.RightCol>
                <Shared.NhubAmountInput
                  balance={inTokenBalance ?? 0}
                  iconUrl={bridge.inToken.iconUrl}
                  minimum={bridge.minimum}
                  symbol={bridge.inToken.symbol}
                  onChangeAmount={setAmount}
                />
                <Content.ToNetworkWrapper span={24} style={{ marginTop: 30 }}>
                  <Shared.NhubTypo type="regular" usage="bridge">
                    To
                  </Shared.NhubTypo>
                  {bridge.outToken.network.iconUrl != null ? (
                    <img
                      width="24"
                      height="24"
                      src={bridge.outToken.network.iconUrl}
                    />
                  ) : (
                    <></>
                  )}
                  <Shared.NhubTypo type="regular" usage="bridge">
                    {bridge.outToken.network.name}
                  </Shared.NhubTypo>
                </Content.ToNetworkWrapper>
                <Content.LeftCol span={24}>
                  <Shared.NhubAmountInput
                    balance={inTokenBalance ?? 0}
                    iconUrl={bridge.outToken.iconUrl}
                    minimum={0}
                    symbol={bridge.outToken.symbol}
                    onChangeAmount={() => {}}
                    viewerAmount={expectAmount}
                  />
                </Content.LeftCol>
              </>
            ) : (
              <></>
            )}
            <Content.LeftCol span={24} style={{ marginTop: 40 }}>
              <DetailButton
                onClick={onClickTransfer}
                disabled={!isEnabledTransfer}
              >
                Transfer
              </DetailButton>
            </Content.LeftCol>
          </Content.Row>
          <Content.Divider style={{ marginTop: 40 }} />
          {bridge != null ? (
            <>
              <Content.Row>
                <Content.LeftCol span={12}>
                  <Shared.NhubTypo type="regular" usage="bridge">
                    Bridge Fee
                  </Shared.NhubTypo>
                </Content.LeftCol>
                <Content.RightCol span={12}>
                  <Shared.NhubTypo type="regular" usage="bridge">
                    {bridge.feeFixed} {bridge.inToken.symbol}
                  </Shared.NhubTypo>
                </Content.RightCol>
                <Content.LeftCol span={12}>
                  <Shared.NhubTypo type="regular" usage="bridge">
                    Minimum amount
                  </Shared.NhubTypo>
                </Content.LeftCol>
                <Content.RightCol span={12}>
                  <Shared.NhubTypo type="regular" usage="bridge">
                    {bridge.minimum} {bridge.inToken.symbol}
                  </Shared.NhubTypo>
                </Content.RightCol>
              </Content.Row>
            </>
          ) : (
            <></>
          )}
        </Content.Body>
      ) : (
        <></>
      )}
      <Content.Modal
        title="Transfer"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {bridge != null ? (
          <>
            <Content.Row gutter={[0, 10]}>
              <Content.LeftCol span={12}>
                <Content.ModalNetworkWrapper>
                  <div>
                    <img src={bridge.inToken.iconUrl} width="38" height="38" />
                  </div>
                  <div>
                    <Shared.NhubTypo type="regular" usage="bridge">
                      From
                    </Shared.NhubTypo>
                    <Shared.NhubTypo type="bold" usage="bridge">
                      {bridge.inToken.network.name}
                    </Shared.NhubTypo>
                  </div>
                </Content.ModalNetworkWrapper>
              </Content.LeftCol>
              <Content.RightCol span={12}>
                <Shared.NhubTypo type="regular" usage="bridge">
                  - {amount.toLocaleString()} {bridge.inToken.symbol}
                </Shared.NhubTypo>
              </Content.RightCol>
            </Content.Row>
            <Content.ModalTimelineDivider />
            <Content.Row gutter={[0, 10]}>
              <Content.LeftCol span={12}>
                <Content.ModalNetworkWrapper>
                  <div>
                    <img src={bridge.outToken.iconUrl} width="38" height="38" />
                  </div>
                  <div>
                    <Shared.NhubTypo type="regular" usage="bridge">
                      To
                    </Shared.NhubTypo>
                    <Shared.NhubTypo type="bold" usage="bridge">
                      {bridge.outToken.network.name}
                    </Shared.NhubTypo>
                  </div>
                </Content.ModalNetworkWrapper>
              </Content.LeftCol>
              <Content.RightCol span={12}>
                <Shared.NhubTypo type="bold" usage="bridge" color="blue">
                  + {expectAmount.toLocaleString()} {bridge.outToken.symbol}
                </Shared.NhubTypo>
              </Content.RightCol>
            </Content.Row>
            <Content.Divider style={{ marginTop: 20 }} />
            <Content.Row>
              <Content.LeftCol span={12}>
                <Shared.NhubTypo type="regular" usage="bridge">
                  Bridge Fee
                </Shared.NhubTypo>
              </Content.LeftCol>
              <Content.RightCol span={12}>
                <Shared.NhubTypo type="regular" usage="bridge">
                  {bridge.feeFixed} {bridge.inToken.symbol}
                </Shared.NhubTypo>
              </Content.RightCol>
            </Content.Row>
            <Content.LeftCol span={24} style={{ marginTop: 40 }}>
              <DetailButton
                onClick={onClickConfirmTransfer}
                disabled={!isEnabledTransfer}
              >
                Confirm Transfer
              </DetailButton>
            </Content.LeftCol>
            <Shared.NhubTypo type="regular" usage="bridge">
              Bridge transfer may take some time.
            </Shared.NhubTypo>
          </>
        ) : (
          <></>
        )}
      </Content.Modal>
    </Content.Layout>
  );
};

export default BridgeView;

const ViewWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Content = {
  Layout: styled(Layout)`
    background: none;
  `,
  Header: styled.div`
    width: 100%;
    text-align: center;
  `,
  Body: styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: ${(props) =>
      props.theme.breakpoint === "mobile" ? "100%" : "500px"};
    background-color: #20202a;
    border-radius: 20px;
    color: #fff;
    padding: 45px 30px;
  `,
  Row: styled(Row)``,
  LeftCol: styled(Col)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
  RightCol: styled(Col)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    text-align: right;
  `,
  ExpectAmount: styled.div`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: #121212;
    vertical-align: middle;
    text-align: right;
    padding: 12px 10px;
    font-size: 14px;
    font-weight: bold;
  `,
  ToNetworkWrapper: styled(Col)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      margin-left: 8px;
      width: 24px;
      height: 24px;
    }
    span {
      margin-left: 8px;
    }
  `,
  Divider: styled.div`
    width: 100%;
    border: solid 0.5px #d3dce8;
    margin-bottom: 30px;
  `,
  Modal: styled(Modal)`
    color: #fff;
    .ant-modal-title {
      background-color: #20202a;
      color: #fff;
      text-align: center;
    }
    .ant-modal-close-x {
      color: #fff;
    }
    .ant-modal-content {
      background-color: #20202a;
    }
  `,
  ModalTimelineDivider: styled.div`
    display: inline-block;
    height: 24px;
    width: 1px;
    margin: 11px 0 11px 26px;
    background-color: #d3dce8;
  `,
  ModalNetworkWrapper: styled.div`
    div {
      display: inline-block;
      margin-left: 8px;
    }
    img {
      vertical-align: text-bottom;
    }
    span {
      display: block;
    }
  `,
};
