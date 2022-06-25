from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .sendpacket import SendPacket
import logging
import traceback

logger = logging.getLogger("django")

class SendPacketAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        try:
            if not 'macaddr' in request.data:
                return Response('', status=status.HTTP_400_BAD_REQUEST)
            sendpacket = SendPacket()
            result = sendpacket.sendpacket(request.data['macaddr'])
            return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
