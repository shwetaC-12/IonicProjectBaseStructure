export interface PayloadPacket
{
    Ref: number;
    PartNo: number;
    TotalPartCount: number;
    Sender: number;
    Topic: string;
    PayloadDescriptor: string;
    Payload: any;
    TargetMethod: string;
    ProcessToken?: string;
}

export class PayloadPacketWrapper
{
    Topic: string = '';
    PayloadPacket: PayloadPacket = null as any;

    public static Create(topic: string, payloadPacket: PayloadPacket)
    {
        let result = new PayloadPacketWrapper();
        result.Topic = topic;
        result.PayloadPacket = payloadPacket;

        return result;
    }
}
