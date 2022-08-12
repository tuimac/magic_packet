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
            arp = Arp()
            result = dict()
            if self.kwargs.get('ip') == None:
                result = arp.sendpacket()
                logger.error(result)
            else:
                if self.kwargs.get('ip') == None:

                result = arp.sendpacket(dest_ip=self.kwargs.get('ip'), interface=self.kwargs.get('interface'))
                logger.error(result)
            return Response(result, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response('{"result": "Runtime error."}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
