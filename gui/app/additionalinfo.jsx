import PostRegistration from '../components/forms/postRegistration'
import { Text, View } from '../components/Themed'

export default function additionalinfo() {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>

      <PostRegistration/>
    </View>
  )
}