import { Avatar, Card, Skeleton, Typography } from "antd";
import { CardSize } from "antd/lib/card/Card";
import "./style.less";

interface CardType {
  loading: boolean;
  size: CardSize;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

const { Meta } = Card;
const { Text } = Typography;

function KCard({ user, cardData }: { user: User; cardData: CardType }) {
  return (
    <Card className="k-card" size={cardData.size} bordered={false}>
      <Skeleton loading={cardData.loading} avatar active>
        <Meta
          avatar={<Avatar src={user.avatar} />}
          title={
            <Text className="text-paragraph-size text-card-title-color text-500">
              {user.name}
            </Text>
          }
          description={
            <Text className="text-paragraph-size text-card-description-color">
              {user.email}
            </Text>
          }
        />
      </Skeleton>
    </Card>
  );
}

export default KCard;
