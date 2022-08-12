from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .arp import Arp
import logging
import traceback

logger = logging.getLogger("django")

class ArpAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('ip') == None:
                logger.error("There is no IP address in the query parameter.")
                return Response('{"code": "3", "result": "Need the parameter."}', status=status.HTTP_400_BAD_REQUEST)
            else:
                arp = Arp()
                interface = None
                interface = self.kwargs.get('interface')
                result = arp.sendpacket(dest_ip=self.kwargs.get('ip'), interface=interface)
                return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"code": "2", "result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
